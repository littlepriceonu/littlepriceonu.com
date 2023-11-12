export interface ProjectData {
    name: string,
    image: string,
    description: string,
    color: string,
    languages: Language[],
    href: string
}

export interface Language {
    name: string,
    icon: string
}