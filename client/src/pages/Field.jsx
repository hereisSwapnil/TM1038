import React, { useState } from 'react';

function Field() {
    const [selectedInterest, setSelectedInterest] = useState('');

    function navigateToInterest(interest) {
        setSelectedInterest(interest);
        switch (interest) {
            case 'Programming':
                window.location.href = '/programming';
                break;
            case 'Design':
                window.location.href = '/design';
                break;
            case 'Marketing':
                window.location.href = '/marketing';
                break;
            default:
                alert('Please select a valid interest');
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="mb-4 text-2xl">Select Your Field of Interest</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div
                    className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${selectedInterest === 'Programming' ? 'bg-blue-200' : 'bg-B2D5E8 hover:bg-blue-200'}`}
                    onClick={() => navigateToInterest('Programming')}
                >
                    Programming
                </div>
                <div
                    className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${selectedInterest === 'Data Science and Machine learning' ? 'bg-blue-200' : 'bg-B2D5E8 hover:bg-blue-200'}`}
                    onClick={() => navigateToInterest('Data Science')}
                >
                    Data Science and Machine learning
                </div>
                <div
                    className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${selectedInterest === 'Design' ? 'bg-blue-200' : 'bg-B2D5E8 hover:bg-blue-200'}`}
                    onClick={() => navigateToInterest('Web Development and App Development')}
                >
                    Web Development and App Development
                </div>
                <div
                    className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${selectedInterest === 'Marketing' ? 'bg-blue-200' : 'bg-B2D5E8 hover:bg-blue-200'}`}
                    onClick={() => navigateToInterest('Cyber Security ')}
                >
                    Cyber Security 
                </div>
                <div
                    className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${selectedInterest === 'Design' ? 'bg-blue-200' : 'bg-B2D5E8 hover:bg-blue-200'}`}
                    onClick={() => navigateToInterest('Design')}
                >
                    Design
                </div>
                <div
                    className={`card p-4 border-2 border-transparent rounded shadow transform transition-all duration-500 ease-in-out hover:border-blue-500 hover:scale-110 ${selectedInterest === 'Marketing' ? 'bg-blue-200' : 'bg-B2D5E8 hover:bg-blue-200'}`}
                    onClick={() => navigateToInterest('Marketing')}
                >
                    Marketing
                </div>
            </div>
        </div>
    );
}

export default Field;
