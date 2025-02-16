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
        <div className="flex flex-col w-full md:w-1/3 relative" style={{ zIndex: 9999 }}>
            <label htmlFor="tagFilter" className="mb-1 text-foreground">Tags</label>

            <Select
                id="tagFilter"
                options={tagOptions}
                isMulti
                isSearchable={true}
                value={tagOptions.filter(option => selectedTags.includes(option.value))}
                onChange={handleTagSelectChange}
                placeholder="Select tags..."
                menuPortalTarget={document.body}
                classNames={{
                    control: () => "!min-h-10 border border-input bg-background hover:bg-accent",
                    menu: () => "bg-background border border-input",
                    menuList: () => "bg-background",
                    multiValue: () => "bg-accent",
                    multiValueLabel: () => "text-foreground",
                    multiValueRemove: () => "text-foreground hover:bg-destructive hover:text-destructive-foreground",
                    option: () => "hover:bg-accent hover:text-accent-foreground",
                    placeholder: () => "text-muted-foreground",
                }}
                styles={{
                    control: (base) => ({
                        ...base,
                        backgroundColor: 'var(--background)',
                        color: 'var(--foreground)',
                        borderColor: 'var(--input)',
                        boxShadow: 'none',
                        '&:hover': {
                            borderColor: 'var(--input)',
                        },
                    }),
                    input: (base) => ({
                        ...base,
                        color: 'var(--foreground)',
                    }),
                    menuPortal: (base) => ({
                        ...base,
                        zIndex: 9999,
                    }),
                    menu: (base) => ({
                        ...base,
                        backgroundColor: 'var(--background)',
                        zIndex: 9999,
                    }),
                    menuList: (base) => ({
                        ...base,
                        padding: 0,
                    }),
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? 'var(--accent)' : 'var(--background)',
                        color: state.isFocused ? 'var(--accent-foreground)' : 'var(--foreground)',
                        cursor: 'pointer',
                        '&:active': {
                            backgroundColor: 'var(--accent)',
                        },
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: 'var(--accent)',
                    }),
                    multiValueLabel: (base) => ({
                        ...base,
                        color: 'var(--foreground)',
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        color: 'var(--foreground)',
                        '&:hover': {
                            backgroundColor: 'var(--destructive)',
                            color: 'var(--destructive-foreground)',
                        },
                    }),
                    valueContainer: (base) => ({
                        ...base,
                        padding: '0 8px',
                    }),
                }}
            />
        </div>
    );
}