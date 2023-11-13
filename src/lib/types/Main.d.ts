export interface FeaturedProjectData {
    name: string,
    image: string,
    description: string,
    color: string,
    technologies: Technology[],
    href: string
}

export interface Technology {
    name: string,
    icon: string
}

export interface ProjectData {
    name: string
    description: string,
    icon?: string,
    color?: string,
    technologies: Language[],
    href: string
}