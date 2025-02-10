def format_char_field(value: str) -> str:
    if not value:
        return ""
    return " ".join(word.capitalize() for word in value.split())
