"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Typography,
  Backdrop,
} from "@mui/material";
import parseUserAnswers from "@/lib/parsers/userAnswersToTags";

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
        console.log('Form submitted:', formData);
        try {
        const userTags = await parseUserAnswers(formData.yearOfStudy, formData.major, formData.hobbies, formData.freeTime, formData.friendsDescription, formData.socialActivity, formData.superpower);
        console.log('User tags:', userTags);
        // *** Append user tags to the user's profile ***
        localStorage.setItem('userTags', JSON.stringify(userTags));
        onClose();
        } catch (error) {
        console.error('Error parsing user answers:', error);
        }
    };

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return (
        <Backdrop
        open={open}
        sx={{ zIndex: 1300, backdropFilter: "blur(8px)" }}
        >
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="md"
            fullWidth
            scroll="paper"
            PaperProps={{ style: { borderRadius: 20, padding: 20 } }}
        >
            <DialogTitle>
            <Typography variant="h5" align="center">
                Lets get to know you better! 😊🌟
            </Typography>
            </DialogTitle>
            <DialogContent dividers style={{ maxHeight: "80vh" }}>
            <div className="space-y-6">
                <Typography variant="h6">What year of study are you in?</Typography>
                <RadioGroup
                value={formData.yearOfStudy}
                onChange={(e) => handleChange("yearOfStudy", e.target.value)}
                className="grid gap-2"
                >
                {[
                    "Freshman",
                    "Sophomore",
                    "Junior",
                    "Senior",
                    "Graduate Student",
                ].map((year) => (
                    <FormControlLabel
                    key={year}
                    value={year}
                    control={<Radio />}
                    label={year}
                    />
                ))}
                </RadioGroup>
            </div>

            {/* Major */}
            <div className="space-y-3">
                <Typography variant="h6">
                What is your major or area of study?
                </Typography>
                <TextField
                placeholder="e.g., Computer Science, Biology, Business"
                value={formData.major}
                onChange={(e) => handleChange("major", e.target.value)}
                fullWidth
                variant="outlined"
                inputProps={{ maxLength: 50 }}
                />
            </div>

            {/* Hobbies */}
            <div className="space-y-3">
                <Typography variant="h6">
                What are your hobbies? (up to 10 words)
                </Typography>
                <TextField
                placeholder="e.g., reading, hiking, gaming, painting"
                value={formData.hobbies}
                onChange={(e) => handleChange("hobbies", e.target.value)}
                fullWidth
                variant="outlined"
                inputProps={{ maxLength: 100 }}
                />
            </div>

            {/* Free Time */}
            <div className="space-y-3">
                <Typography variant="h6">
                What is your favorite way to spend free time?
                </Typography>
                <RadioGroup
                value={formData.freeTime}
                onChange={(e) => handleChange("freeTime", e.target.value)}
                className="grid gap-2"
                >
                {[
                    "Watching movies or TV shows",
                    "Playing sports or working out",
                    "Creating art, music, or writing",
                    "Learning something new or attending workshops",
                    "Socializing with friends or meeting new people",
                ].map((activity) => (
                    <FormControlLabel
                    key={activity}
                    value={activity}
                    control={<Radio />}
                    label={activity}
                    />
                ))}
                </RadioGroup>
            </div>

            {/* Friends Description */}
            <div className="space-y-3">
                <Typography variant="h6">
                How would your friends describe you?
                </Typography>
                <RadioGroup
                value={formData.friendsDescription}
                onChange={(e) =>
                    handleChange("friendsDescription", e.target.value)
                }
                className="grid gap-2"
                >
                {[
                    "The life of the party",
                    "The creative one",
                    "The planner and organizer",
                    "The quiet and thoughtful one",
                    "The adventurous one",
                ].map((description) => (
                    <FormControlLabel
                    key={description}
                    value={description}
                    control={<Radio />}
                    label={description}
                    />
                ))}
                </RadioGroup>
            </div>

            {/* Social Activity */}
            <div className="space-y-3">
                <Typography variant="h6">
                What is your go-to social activity?
                </Typography>
                <RadioGroup
                value={formData.socialActivity}
                onChange={(e) => handleChange("socialActivity", e.target.value)}
                className="grid gap-2"
                >
                {[
                    "Grabbing coffee or food with friends",
                    "Going to parties or social events",
                    "Playing board games or video games",
                    "Attending workshops or networking events",
                    "Exploring nature or going on adventures",
                ].map((activity) => (
                    <FormControlLabel
                    key={activity}
                    value={activity}
                    control={<Radio />}
                    label={activity}
                    />
                ))}
                </RadioGroup>
            </div>

            {/* Superpower */}
            <div className="space-y-3">
                <Typography variant="h6">
                If you could have a superpower, what would it be?
                </Typography>
                <RadioGroup
                value={formData.superpower}
                onChange={(e) => handleChange("superpower", e.target.value)}
                className="grid gap-2"
                >
                {[
                    "Teleportation—I'd never be late to events!",
                    "Time travel—I'd relive the best moments",
                    "Mind reading—I'd know what everyone's thinking",
                    "Super speed—I'd get everything done in a flash",
                ].map((power) => (
                    <FormControlLabel
                    key={power}
                    value={power}
                    control={<Radio />}
                    label={power}
                    />
                ))}
                </RadioGroup>
            </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={handleSubmit} color="primary" variant="contained">
                Submit
            </Button>
            </DialogActions>
        </Dialog>
        </Backdrop>
    );
    };

    export default StudentSurveyModal;
