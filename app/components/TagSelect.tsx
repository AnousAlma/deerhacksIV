"use client";
import Select from "react-select";



const availableTags = [
    "nature", "coding", "music", "sports", "art", "travel", "food", "tech",
    "education", "health", "science", "history", "literature", "fashion", "politics",
    "finance", "gaming", "entertainment", "lifestyle", "design", "architecture",
    "photography", "culture", "business", "innovation", "environment", "animals",
    "outdoors", "fitness", "movies", "theater", "dance", "comedy", "news", "blogging",
    "marketing", "social", "community", "religion", "philosophy", "psychology", "spirituality",
    "diy", "crafts", "automotive", "traveling", "investing", "startups", "parenting", "relationships"
];
const tagOptions = availableTags.map((tag) => ({ value: tag, label: tag }));


interface TagSelectProps {
    selectedTags: string[];
    setSelectedTags: (tags: string[]) => void;
    refreshPosts: () => void;
}

export default function TagSelect({ selectedTags, setSelectedTags, refreshPosts }: TagSelectProps) {
    
    const handleTagSelectChange = (selectedOptions: any) => {
        setSelectedTags(
            selectedOptions ? selectedOptions.map((option: any) => option.value) : []
        );
        refreshPosts();
    };

    return (
        <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="tagFilter" className="mb-1" style={{ color: 'white' }}>Tags</label>

            <Select
                id="tagFilter"
                options={tagOptions}
                isMulti
                isSearchable={true}
                value={tagOptions.filter(option => selectedTags.includes(option.value))}
                onChange={handleTagSelectChange}
                placeholder="Select tags..."
                styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                        minHeight: '40px',
                        height: '40px',
                        borderRadius: '0.375rem',
                        border: '1px solid var(--foreground)',
                    }),
                    input: (base) => ({
                        ...base,
                        color: 'white', // Ensures typed text is white
                    }),
                    singleValue: (base) => ({
                        ...base,
                        color: 'var(--foreground)'
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)'
                    }),
                    option: (base) => ({
                        ...base,
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                        '&:hover': {
                            backgroundColor: 'var(--foreground)',
                            color: 'var(--background)'
                        }
                    })
                }}
            />
        </div>
    );
}