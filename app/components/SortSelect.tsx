"use client";

interface TagSelectProps {
    sortBy: 'newest' | 'popularity';
    setSortBy: (value: 'newest' | 'popularity') => void;
    refreshPosts: () => void;
}

export default function SortSelect({ sortBy, setSortBy, refreshPosts }: TagSelectProps) {
    
    const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value as 'newest' | 'popularity');
        refreshPosts();
    };

    return (
        <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="sortBy" style={{ color: 'white' }}>Sort</label>
            <select
                id="sortBy"
                className="px-2 rounded h-[40px] w-full"
                style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--foreground)'
                }}
                value={sortBy}
                onChange={handleSortChange}
            >
                <option value="newest">Newest to Oldest</option>
                <option value="popularity">Popularity</option>
            </select>
        </div>
    );
}