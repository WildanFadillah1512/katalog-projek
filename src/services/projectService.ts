import type { IProject, ProjectFilters } from '../types';
import { projects } from '../data/projects';

export const projectService = {
    async getProjects(): Promise<IProject[]> {
        // Simulate async
        return new Promise(resolve => setTimeout(() => resolve(projects), 100));
    },

    async getProjectBySlug(slug: string): Promise<IProject | undefined> {
        return new Promise(resolve => {
            setTimeout(() => {
                const project = projects.find(p => p.slug === slug);
                resolve(project);
            }, 100);
        });
    },

    async getFeaturedProjects(limit: number = 3): Promise<IProject[]> {
        const all = await this.getProjects();
        return all.filter(p => p.featured).slice(0, limit);
    },

    async searchProjects(filters: ProjectFilters): Promise<IProject[]> {
        const all = await this.getProjects();
        let filtered = [...all];

        if (filters.searchQuery && filters.searchQuery.trim()) {
            const query = filters.searchQuery.toLowerCase().trim();
            filtered = filtered.filter(project =>
                project.title.toLowerCase().includes(query) ||
                project.shortDescription.toLowerCase().includes(query) ||
                project.techStack.some(tech => tech.toLowerCase().includes(query))
            );
        }

        if (filters.category && filters.category !== 'all') {
            filtered = filtered.filter(project => project.category === filters.category);
        }

        if (filters.techStack && filters.techStack !== 'all') {
            filtered = filtered.filter(project =>
                project.techStack.some(tech => tech === filters.techStack)
            );
        }

        if (filters.accessLevel) {
            filtered = filtered.filter(project => project.accessLevel === filters.accessLevel);
        }

        return filtered;
    },

    async getCategories(): Promise<string[]> {
        const projects = await this.getProjects();
        const categories = projects.map(p => p.category);
        return ['all', ...Array.from(new Set(categories))];
    },

    async getTechStacks(): Promise<string[]> {
        const projects = await this.getProjects();
        const allTech = projects.flatMap(p => p.techStack);
        return ['all', ...Array.from(new Set(allTech))];
    },
};
