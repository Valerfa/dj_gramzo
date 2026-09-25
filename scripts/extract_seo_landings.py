"""Convert the approved landing-page copy from DOCX into site JSON data."""

import json
import re
import sys
from pathlib import Path

from docx import Document


SLUGS = [
    "didzhey_na_korporativ",
    "didzhey_na_vecherinku",
    "didzhey_na_prezentatsiyu",
    "didzhey_na_vistavku",
    "didzhey_na_festival",
    "didzhey_na_biznes_meropriyatie",
    "didzhey_na_zakritoe_meropriyatie",
    "didzhey_veduschiy_na_meropriyatie",
    "didzhey_na_chastnie_iventi",
    "didzhey_s_oborudovaniem",
    "muzikalnoe_soprovozhdenie_meropriyatiy",
    "klubniy_didzhey",
    "didzhey_na_den_goroda",
]


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\u00a0", " ")).strip()


def content_blocks(paragraphs):
    blocks = []
    list_items = []

    def flush_list():
        nonlocal list_items
        if list_items:
            blocks.append({"type": "list", "items": list_items})
            list_items = []

    for paragraph in paragraphs:
        text = clean(paragraph.text)
        if not text:
            continue
        if paragraph.style.name == "List Paragraph":
            list_items.append(text)
            continue
        flush_list()
        blocks.append({"type": "paragraph", "text": text})

    flush_list()
    return blocks


def parse_section(paragraphs, slug):
    nonempty = [p for p in paragraphs if clean(p.text)]
    labels = {clean(p.text): i for i, p in enumerate(nonempty)}
    description_index = labels["Description:"]
    text_index = labels["Текст:"]

    keywords = [
        clean(p.text)
        for p in nonempty[labels["КС:"] + 1 : description_index]
    ]
    description = clean(nonempty[description_index + 1].text)
    body = nonempty[text_index + 1 :]
    title_index = next(
        index for index, p in enumerate(body) if p.style.name == "Heading 1"
    )
    title = clean(body[title_index].text)
    body = body[title_index + 1 :]

    heading_indexes = [
        index
        for index, p in enumerate(body)
        if p.style.name in {"Heading 2", "Heading 3"}
    ]
    first_heading = heading_indexes[0] if heading_indexes else len(body)
    intro = content_blocks(body[:first_heading])
    sections = []

    for position, start in enumerate(heading_indexes):
        end = heading_indexes[position + 1] if position + 1 < len(heading_indexes) else len(body)
        sections.append(
            {
                "heading": clean(body[start].text),
                "blocks": content_blocks(body[start + 1 : end]),
            }
        )

    return {
        "slug": slug,
        "title": title,
        "description": description,
        "keywords": keywords,
        "intro": intro,
        "sections": sections,
    }


def main():
    if len(sys.argv) != 3:
        raise SystemExit("Usage: extract_seo_landings.py SOURCE.docx OUTPUT.json")

    source = Path(sys.argv[1])
    destination = Path(sys.argv[2])
    document = Document(source)
    groups = []
    current = []

    for paragraph in document.paragraphs:
        if clean(paragraph.text).startswith("Ссылка на проверку уникальности:"):
            if current:
                groups.append(current)
            current = []
        current.append(paragraph)
    if current:
        groups.append(current)

    source_groups = groups[1:]
    if len(source_groups) != len(SLUGS):
        raise ValueError(
            f"Expected {len(SLUGS)} landing pages after /moscow, found {len(source_groups)}"
        )

    landings = {
        slug: parse_section(paragraphs, slug)
        for slug, paragraphs in zip(SLUGS, source_groups)
    }
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(
        json.dumps(landings, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


if __name__ == "__main__":
    main()
