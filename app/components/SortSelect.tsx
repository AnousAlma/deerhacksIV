"use client";

interface SortSelectProps {
    sortBy: 'newest' | 'popularity';
    setSortBy: (value: 'newest' | 'popularity') => void;
    refreshPosts: () => void;
}

export default function SortSelect({ sortBy, setSortBy, refreshPosts }: SortSelectProps) {
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as 'newest' | 'popularity');
        refreshPosts();
    };

    return (
        <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="sortBy" className="text-foreground">Sort</label>
            <select
                id="sortBy"
                className="px-2 rounded h-[40px] w-full bg-background text-foreground border border-foreground"
                value={sortBy}
                onChange={handleSortChange}
            >
                <option value="newest">Newest to Oldest</option>
                <option value="alphabetical">Alphabetical</option>
            </select>
        </div>
    );
}