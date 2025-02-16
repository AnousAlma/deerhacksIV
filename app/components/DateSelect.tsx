"use client";


interface DateSelectProps {
    minimumDate: string;
    setMinimumDate: (value: string) => void;
    refreshPosts: () => void;
}

export default function DateSelect({ minimumDate, setMinimumDate, refreshPosts }: DateSelectProps) { 
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMinimumDate(e.target.value);
        refreshPosts();
    };

    return (
        <div className="flex flex-col w-full md:w-1/3">
            <label htmlFor="dateFilter" style={{ color: 'white' }}>Date</label>
            <input
                id="dateFilter"
                type="date"
                className="px-2 rounded h-[40px] w-full"
                style={{
                    backgroundColor: 'var(--background)',
                    color: 'var(--foreground)',
                    border: '1px solid var(--foreground)'
                }}
                value={minimumDate}
                onChange={handleDateChange}
            />
        </div>
    );
}