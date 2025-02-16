"use client";
import React, { useState } from "react";
import { parseUserAnswers } from "@/lib/utils/userAnswersToTags";

interface StudentSurveyModalProps {
  open: boolean;
  onClose: () => void;
}

const StudentSurveyModal: React.FC<StudentSurveyModalProps> = ({
  open,
  onClose,
}) => {
    const [formData, setFormData] = useState({
        yearOfStudy: "",
        major: "",
        hobbies: "",
        freeTime: "",
        friendsDescription: "",
        socialActivity: "",
        superpower: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        try {
            const userTags = await parseUserAnswers(
                formData.yearOfStudy,
                formData.major,
                formData.hobbies,
                formData.freeTime,
                formData.friendsDescription,
                formData.socialActivity,
                formData.superpower
            );
            localStorage.setItem('userTags', JSON.stringify(userTags));
            onClose();
        } catch (error) {
            console.error('Error parsing user answers:', error);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    if (!open) return null;

    const RadioOption = ({ value, label, name, currentValue, onChange }: any) => (
        <label className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer hover:bg-gray-100/80 dark:hover:bg-gray-700/80 transition-all duration-300 transform hover:scale-102 hover:shadow-md">
            <input
                type="radio"
                value={value}
                checked={currentValue === value}
                onChange={onChange}
                name={name}
                className="w-4 h-4 text-blue-600 dark:text-blue-400 border-gray-300 dark:border-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <span className="text-gray-700 dark:text-gray-200">{label}</span>
        </label>
    );

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center ${open ? 'animate-fadeIn' : 'hidden'}`}>
            <style jsx>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                
                @keyframes floatIn {
                    0% { transform: translateY(20px); opacity: 0; }
                    100% { transform: translateY(0); opacity: 1; }
                }
                
                @keyframes gradientMove {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                
                .modal-content {
                    animation: floatIn 0.6s ease-out;
                    background-image: radial-gradient(circle at 10px 10px, rgba(255,255,255,0.05) 1px, transparent 1px);
                    background-size: 20px 20px;
                }
                
                .dark .modal-content {
                    background-image: radial-gradient(circle at 10px 10px, rgba(255,255,255,0.025) 1px, transparent 1px);
                }
                
                .shine-button {
                    position: relative;
                    overflow: hidden;
                }
                
                .shine-button::after {
                    content: '';
                    position: absolute;
                    top: -50%;
                    left: -50%;
                    width: 200%;
                    height: 200%;
                    background: linear-gradient(
                        45deg,
                        transparent,
                        rgba(255,255,255,0.1),
                        transparent
                    );
                    transform: rotate(45deg);
                    animation: shine 3s infinite;
                }
                
                @keyframes shine {
                    0% { transform: translateX(-100%) rotate(45deg); }
                    100% { transform: translateX(100%) rotate(45deg); }
                }
            `}</style>
            
            <div className="fixed inset-0 bg-black/30 dark:bg-black/50 backdrop-blur-sm animate-fadeIn" onClick={onClose} />
            
            <div className="modal-content relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 m-4 border border-gray-200 dark:border-gray-700">
                <div className="text-center mb-8 transform hover:scale-105 transition-transform duration-300">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    Lets find the perfect events for you! ✨
                    </h2>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Share your story and let's create something special!</p>
                </div>

                <div className="space-y-8">
                    {/* Year of Study */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            What year of study are you in?
                        </h3>
                        <div className="space-y-2">
                            {["Freshman", "Sophomore", "Junior", "Senior", "Graduate Student"].map((year) => (
                                <RadioOption
                                    key={year}
                                    value={year}
                                    label={year}
                                    name="yearOfStudy"
                                    currentValue={formData.yearOfStudy}
                                    onChange={(e: any) => handleChange("yearOfStudy", e.target.value)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Major */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            What is your major or area of study?
                        </h3>
                        <input
                            type="text"
                            placeholder="e.g., Computer Science, Biology, Business"
                            value={formData.major}
                            onChange={(e) => handleChange("major", e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                            maxLength={50}
                        />
                    </div>

                    {/* Hobbies */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            What are your hobbies? (up to 10 words)
                        </h3>
                        <input
                            type="text"
                            placeholder="e.g., reading, hiking, gaming, painting"
                            value={formData.hobbies}
                            onChange={(e) => handleChange("hobbies", e.target.value)}
                            className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-all duration-300"
                            maxLength={100}
                        />
                    </div>

                    {/* Free Time */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            What is your favorite way to spend free time?
                        </h3>
                        <div className="space-y-2">
                            {[
                                "Watching movies or TV shows",
                                "Playing sports or working out",
                                "Creating art, music, or writing",
                                "Learning something new or attending workshops",
                                "Socializing with friends or meeting new people",
                            ].map((activity) => (
                                <RadioOption
                                    key={activity}
                                    value={activity}
                                    label={activity}
                                    name="freeTime"
                                    currentValue={formData.freeTime}
                                    onChange={(e: any) => handleChange("freeTime", e.target.value)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Friends Description */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            How would your friends describe you?
                        </h3>
                        <div className="space-y-2">
                            {[
                                "The life of the party",
                                "The creative one",
                                "The planner and organizer",
                                "The quiet and thoughtful one",
                                "The adventurous one",
                            ].map((description) => (
                                <RadioOption
                                    key={description}
                                    value={description}
                                    label={description}
                                    name="friendsDescription"
                                    currentValue={formData.friendsDescription}
                                    onChange={(e: any) => handleChange("friendsDescription", e.target.value)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Social Activity */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            What is your go-to social activity?
                        </h3>
                        <div className="space-y-2">
                            {[
                                "Grabbing coffee or food with friends",
                                "Going to parties or social events",
                                "Playing board games or video games",
                                "Attending workshops or networking events",
                                "Exploring nature or going on adventures",
                            ].map((activity) => (
                                <RadioOption
                                    key={activity}
                                    value={activity}
                                    label={activity}
                                    name="socialActivity"
                                    currentValue={formData.socialActivity}
                                    onChange={(e: any) => handleChange("socialActivity", e.target.value)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Superpower */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                            If you could have a superpower, what would it be?
                        </h3>
                        <div className="space-y-2">
                            {[
                                "Teleportation—I'd never be late to events!",
                                "Time travel—I'd relive the best moments",
                                "Mind reading—I'd know what everyone's thinking",
                                "Super speed—I'd get everything done in a flash",
                            ].map((power) => (
                                <RadioOption
                                    key={power}
                                    value={power}
                                    label={power}
                                    name="superpower"
                                    currentValue={formData.superpower}
                                    onChange={(e: any) => handleChange("superpower", e.target.value)}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="mt-8 flex justify-end">
                    <button
                        onClick={handleSubmit}
                        className="shine-button group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
                    >
                        <span className="relative z-10 flex items-center justify-center">
                            <span>Let's Go!</span>
                            <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StudentSurveyModal;