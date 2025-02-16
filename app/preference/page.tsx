"use client"
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardActions, Typography, Button, RadioGroup, FormControlLabel, Radio, TextField } from '@mui/material';

export default function StudentSurveyForm() {
  const [formData, setFormData] = useState({
    yearOfStudy: '',
    major: '',
    hobbies: '',
    freeTime: '',
    friendsDescription: '',
    socialActivity: '',
    superpower: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen p-6 flex items-center justify-center">
      <Card className="w-full max-w-2xl"
      >
        <CardHeader
        title={
            <Typography variant="h5" component="div" className="text-center">Student Preference</Typography>

        }>
   
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Year of Study */}
            <div className="space-y-3">
              <Typography variant="h6">What year of study are you in?</Typography>
              <RadioGroup
                value={formData.yearOfStudy}
                onChange={(e) => handleChange('yearOfStudy', e.target.value)}
                className="grid gap-2"
              >
                {['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate Student'].map((year) => (
                  <FormControlLabel key={year} value={year} control={<Radio />} label={year} />
                ))}
              </RadioGroup>
            </div>

            {/* Major */}
            <div className="space-y-3">
              <Typography variant="h6">What's your major or area of study?</Typography>
              <TextField
                placeholder="e.g., Computer Science, Biology, Business"
                value={formData.major}
                onChange={(e) => handleChange('major', e.target.value)}
                fullWidth
                variant="outlined"
                inputProps={{ maxLength: 50 }}
              />
            </div>

            {/* Hobbies */}
            <div className="space-y-3">
              <Typography variant="h6">What are your hobbies? (up to 10 words)</Typography>
              <TextField
                placeholder="e.g., reading, hiking, gaming, painting"
                value={formData.hobbies}
                onChange={(e) => handleChange('hobbies', e.target.value)}
                fullWidth
                variant="outlined"
                inputProps={{ maxLength: 100 }}
              />
            </div>

            {/* Free Time */}
            <div className="space-y-3">
              <Typography variant="h6">What's your favorite way to spend free time?</Typography>
              <RadioGroup
                value={formData.freeTime}
                onChange={(e) => handleChange('freeTime', e.target.value)}
                className="grid gap-2"
              >
                {[
                  "Watching movies or TV shows",
                  "Playing sports or working out",
                  "Creating art, music, or writing",
                  "Learning something new or attending workshops",
                  "Socializing with friends or meeting new people"
                ].map((activity) => (
                  <FormControlLabel key={activity} value={activity} control={<Radio />} label={activity} />
                ))}
              </RadioGroup>
            </div>

            {/* Friends Description */}
            <div className="space-y-3">
              <Typography variant="h6">How would your friends describe you?</Typography>
              <RadioGroup
                value={formData.friendsDescription}
                onChange={(e) => handleChange('friendsDescription', e.target.value)}
                className="grid gap-2"
              >
                {[
                  "The life of the party",
                  "The creative one",
                  "The planner and organizer",
                  "The quiet and thoughtful one",
                  "The adventurous one"
                ].map((description) => (
                  <FormControlLabel key={description} value={description} control={<Radio />} label={description} />
                ))}
              </RadioGroup>
            </div>

            {/* Social Activity */}
            <div className="space-y-3">
              <Typography variant="h6">What's your go-to social activity?</Typography>
              <RadioGroup
                value={formData.socialActivity}
                onChange={(e) => handleChange('socialActivity', e.target.value)}
                className="grid gap-2"
              >
                {[
                  "Grabbing coffee or food with friends",
                  "Going to parties or social events",
                  "Playing board games or video games",
                  "Attending workshops or networking events",
                  "Exploring nature or going on adventures"
                ].map((activity) => (
                  <FormControlLabel key={activity} value={activity} control={<Radio />} label={activity} />
                ))}
              </RadioGroup>
            </div>

            {/* Superpower */}
            <div className="space-y-3">
              <Typography variant="h6">If you could have a superpower, what would it be?</Typography>
              <RadioGroup
                value={formData.superpower}
                onChange={(e) => handleChange('superpower', e.target.value)}
                className="grid gap-2"
              >
                {[
                  "Teleportation—I'd never be late to events!",
                  "Time travel—I'd relive the best moments",
                  "Mind reading—I'd know what everyone's thinking",
                  "Super speed—I'd get everything done in a flash"
                ].map((power) => (
                  <FormControlLabel key={power} value={power} control={<Radio />} label={power} />
                ))}
              </RadioGroup>
            </div>

            <CardActions>
              <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit Survey
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}