# SPDX-FileCopyrightText: 2023 Alexandru Fikl <alexfikl@gmail.com>
# SPDX-License-Identifier: MIT

from __future__ import annotations

import logging
import pathlib

import bs4
import requests
import rich.logging

logger = logging.getLogger(pathlib.Path(__file__).stem)
logger.setLevel(logging.ERROR)
logger.addHandler(rich.logging.RichHandler())

SCRIPT_PATH = pathlib.Path(__file__)
SCRIPT_LONG_HELP = f"""\
Scrape the ANELIS website `https://www.anelisplus.ro/?page_id=36` for universities
that are part of the consortium.

Example:

    > {SCRIPT_PATH.name} --json
"""

# {{{ ANELIS+ members

ANELIS_PLUS_MEMBERS = "https://www.anelisplus.ro/?page_id=36"


def anelis_plus_extract_members(url: str) -> int:
    response = requests.get(url)
    soup = bs4.BeautifulSoup(response.content, features="lxml")

    (div,) = soup.find_all(name="div", attrs={"class": "entry-content cf"})
    return [
        m.split(" ", maxsplit=1)[-1].strip()
        for m in list(div.children)[5].contents
        if isinstance(m, str)
    ]


def anelis_plus(*, to_json: bool = True) -> int:
    try:
        members = anelis_plus_extract_members(ANELIS_PLUS_MEMBERS)
    except Exception as exc:
        logger.error(
            "Failed to extract members from '%s'.",
            ANELIS_PLUS_MEMBERS,
            exc_info=exc,
        )
        return 1

    if to_json:
        import json

        print(json.dumps(members, indent=2, ensure_ascii=False))
    else:
        for m in members:
            print(m)

    return 0


# }}}


if __name__ == "__main__":
    import argparse

    # main parser
    parser = argparse.ArgumentParser()
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

    raise SystemExit(anelis_plus(to_json=args.json))
