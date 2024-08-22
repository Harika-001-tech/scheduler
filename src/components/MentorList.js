import React from 'react';

const MentorList = ({ mentors, onSelectMentor }) => {
    return (
        <div>
            <h3>Available Mentors</h3>
            <ul>
                {mentors.map((mentor) => (
                    <li key={mentor.id}>
                        <button onClick={() => onSelectMentor(mentor.id)}>
                            {mentor.name} - {mentor.specialty} ({mentor.rating}⭐)
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MentorList;
