# SPDX-FileCopyrightText: 2024 Alexandru Fikl <alexfikl@gmail.com>
# SPDX-License-Identifier: MIT

from __future__ import annotations

import logging
import pathlib

import rich.logging

logger = logging.getLogger(pathlib.Path(__file__).stem)
logger.setLevel(logging.ERROR)
logger.addHandler(rich.logging.RichHandler())

SCRIPT_PATH = pathlib.Path(__file__)
SCRIPT_LONG_HELP = f"""\

Example:

    > {SCRIPT_PATH.name} --json
"""


# {{{


def make_resources(filename: pathlib.Path, *, to_json: bool = False) -> int:
    if not filename.exists():
        logger.error("File does not exist: '%s'.", filename)
        return 1

    import tomllib

    with open(filename, "rb") as f:
        resources = tomllib.load(f)

    redirects = {}
    for name, urls in resources.items():
        for host, url in urls.items():
            redirects[host] = {"name": name, "url": url}

    if to_json:
        import json

        print(json.dumps(redirects, indent=2, ensure_ascii=False))
    else:
        for host, resource in redirects.items():
            print(f"{host}: {resource['url']}")

    return 0

# }}}


if __name__ == "__main__":
    import argparse

    # main parser
    parser = argparse.ArgumentParser()
    parser.add_argument("filename", type=pathlib.Path)
    parser.add_argument(
        "-q",
        "--quiet",
        action="store_true",
        help="only show error messages",
    )
    parser.add_argument(
        "-j",
        "--json",
        action="store_true",
        help="output in JSON format",
    )
    args = parser.parse_args()

    if not args.quiet:
        logger.setLevel(logging.INFO)

    raise SystemExit(make_resources(args.filename, to_json=args.json))
