import React from 'react';
import dayjs from 'dayjs';

function JobCard({ title, company, type, experience, location, skills = [], postedOn, job_link }) {
    const diffInDays = dayjs().diff(dayjs(postedOn), 'day');
    
    return (
        <div className='mx-auto mb-6 w-11/12 md:w-3/4 lg:w-2/3'>
            <div className='flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-white rounded-xl border border-yellow-300 shadow-lg hover:shadow-xl transition-all'>
                <div className='flex flex-col items-start gap-3'>
                    <h1 className='text-2xl font-bold'>{title} - <span className='text-orange-800'>{company}</span></h1>
                    <p className='text-orange-100'>{type} &#x2022; {experience} &#x2022; {location}</p>
                    <div className='flex flex-wrap gap-2'>
                        {skills.map((skill, i) => (
                            <span key={i} className='bg-white text-orange-700 py-1 px-3 rounded-lg text-sm font-semibold'>{skill}</span>
                        ))}
                    </div>
                </div>
                <div className='flex flex-col md:flex-row items-start md:items-center gap-4 mt-4 md:mt-0'>
                    <p className='text-orange-200 text-sm'>Posted {diffInDays > 1 ? `${diffInDays} days` : `${diffInDays} day`} ago</p>
                    {job_link && (
                        <a href={job_link} target="_blank" rel="noopener noreferrer">
                            <button className='bg-white text-orange-600 hover:bg-orange-700 hover:text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-transform transform hover:scale-105'>Apply Now</button>
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
}

export default JobCard;
