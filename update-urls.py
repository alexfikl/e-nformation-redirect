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

# {{{ ANELIS+ members

ANELIS_PLUS_MEMBERS = "https://www.anelisplus.ro/?page_id=36"


def extract_anelis_plus_members(*, to_json: bool = True) -> int:
    response = requests.get(ANELIS_PLUS_MEMBERS)
    soup = bs4.BeautifulSoup(response.content, features="lxml")

    (div,) = soup.find_all(name="div", attrs={"class": "entry-content cf"})
    members = [
        m.split(" ", maxsplit=1)[-1].strip()
        for m in list(div.children)[5].contents
        if isinstance(m, str)
    ]

    import json

    if to_json:
        print(json.dumps(members, indent=2, ensure_ascii=False))
    else:
        print("\n".join(f'<option value="None">{m}</option>' for m in members))

    return 0

# }}}


if __name__ == "__main__":
    import argparse

    # main parser
    parser = argparse.ArgumentParser()
    parser.add_argument(
        "-q", "--quiet", action="store_true", help="only show error messages"
    )
    parser.add_argument(
        "-j", "--json", action="store_true", help="output in JSON format"
    )

    # anelis
    subparsers = parser.add_subparsers()
    parser_a = subparsers.add_parser("anelis")
    parser_a.set_defaults(
        func=lambda args: extract_anelis_plus_members(to_json=args.json)
    )

    # call
    args = parser.parse_args()

    if not args.quiet:
        logger.setLevel(logging.INFO)

    raise SystemExit(args.func(args))
