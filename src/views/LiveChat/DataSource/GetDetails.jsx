import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import { BsTrash } from 'react-icons/bs';
import { MdAdd } from 'react-icons/md';
import '../live-chat.css';

function extractWebsiteName(url) {
    try {
        if (!/^https?:\/\//i.test(url)) {
            url = 'http://' + url;
        }
        const { hostname } = new URL(url);
        return hostname;
    } catch (error) {
        console.error('Invalid URL:', url);
        return 'Unknown';
    }
}

function GetDetails() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedWebsiteData, setSelectedWebsiteData] = useState(null);
    const [selectedWebsite, setSelectedWebsite] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({ tag: '', pattern: '', response: '', id: '' });
    const baseURL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const userId = localStorage.getItem('userId');

        const fetchData = async () => {
            if (!userId) {
                console.error('User ID not found');
                setError('User ID not found');
                setLoading(false);
                return;
            }
            
            try {
                const response = await fetch(`${baseURL}/scrap_data/?userId=${userId}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                const dataWithStatus = result.map(item => ({
                    ...item,
                    statusLoading: item.status === 'pending',
                }));
                setData(dataWithStatus);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this record permanently?");
        if (isConfirmed) {
            try {
                const response = await fetch(`${baseURL}/scrap_data/deleteurl/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    setData(prevData => prevData.filter(item => item._id !== id));
                } else {
                    throw new Error(`Failed to delete record with ID ${id}`);
                }
            } catch (error) {
                console.error('Error deleting record:', error);
                setError(error.message);
            }
        }
    };

    const handleWebsiteNameClick = async (id) => {
        try {
            localStorage.setItem('questionId', id)

            const response = await fetch(`${baseURL}/scrap_data/websites/${id}`);
            if (!response.ok) {
                throw new Error(`Error fetching data for ID ${id}`);
            }
            const result = await response.json();

            // Ensure that the data structure is as expected
            if (result.scrapData && result.scrapData.scrap_data) {
                setSelectedWebsiteData(result.scrapData.scrap_data);
                setSelectedWebsite(result.scrapData.scrap_data)
                console.log('Fetched result:', result.scrapData.scrap_data);
            } else {
                console.error('Unexpected data structure:', result);
                setSelectedWebsiteData([]); // Reset if the structure is unexpected
            }
        } catch (error) {
            console.error('Error fetching website data:', error);
            setError(error.message);
        }
    };





    const handleCloseForm = () => {
        setShowForm(false);
    };

    const handlePatternClick = (tag, pattern, response) => {
        setFormData({ tag, pattern, response });
        console.log('Form Data:', { tag, pattern, response });
        setShowForm(true);
    };

    const handleUpdateData = async () => {
        console.log('Updating with ID:', formData.id);
        const questionId = localStorage.getItem('questionId');
        if (!questionId) {
            console.error('No ID found for update');
            return;
        }

        try {
            const response = await fetch(`${baseURL}/scrap_data/update/${questionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tag: formData.tag,
                    pattern: formData.pattern,
                    response: formData.response,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to update data');
            }

            const updatedItem = await response.json();
            // Optionally refresh the data or update local state
            setShowForm(false); // Close the form after successful update
        } catch (error) {
            console.error('Error updating data:', error);
            setError(error.message);
        }
    };


    


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    return (
        <div>
            <div className='hdr_st_so hdr_deta'>
                <div>
                    <h2>Data Sources</h2>
                    <p>Azister will use the knowledge you add here to answer customer questions.</p>
                </div>
                <a href='/data-sources'>
                    <button className='add_new_deta'>
                        <span><MdAdd /></span>
                        Add
                    </button>
                </a>
            </div>

            <div className="scrollAreaViewport">
                {loading ? (
                    <Loader />
                ) : error ? (
                    <p className="error-message">{error}</p>
                ) : selectedWebsiteData ? (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Question</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {selectedWebsiteData.filter(item => item !== null).flatMap(item => {
                                if (!item.patterns) return []; // Handle case where patterns is undefined
                                return item.patterns.map((pattern) => (
                                    <tr key={`${item._id}-${pattern}`}>
                                        <td onClick={() => handlePatternClick(item.tag, pattern, item.responses, item._id)}>
                                            {pattern}
                                        </td>
                                        <td>{new Date(item.date).toLocaleString()}</td>
                                        <td>
                                            <button onClick={() => handleDelete(item._id)}>
                                                <BsTrash />
                                            </button>
                                        </td>
                                    </tr>
                                ));
                            })}

                        </tbody>



                    </table>
                ) : (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Website Name</th>
                                <th>Data Source</th>
                                <th>Used By</th>
                                <th>Status</th>
                                <th>Last Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.length > 0 ? (
                                data.map(item => (
                                    <tr key={item._id}>
                                        <td className={item._id} onClick={() => handleWebsiteNameClick(item._id)} style={{ cursor: 'pointer' }}>
                                            {extractWebsiteName(item.url)}
                                        </td>
                                        <td>Website</td>
                                        <td>Azister</td>
                                        <td>
                                            {item.statusLoading ? (
                                                <Loader />
                                            ) : (
                                                item.status || 'Complete'
                                            )}
                                        </td>
                                        <td>{new Date(item.timestamp).toLocaleString()}</td>
                                        <td>
                                            <button onClick={() => handleDelete(item._id)}><BsTrash /></button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">No data available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                )}
            </div>

            {showForm && (
                <div className={`form-container ${showForm ? 'slide-in' : 'slide-out'}`}>
                    <div className="form-header">
                        <h3>Edit Pattern</h3>
                        <button onClick={handleCloseForm}>Close</button>
                    </div>
                    <form>
                        <div className="form-group">
                            <label>Tag</label>
                            <input type="text" name="tag" value={formData.tag} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Pattern</label>
                            <input type="text" name="pattern" value={formData.pattern} onChange={handleChange} />
                        </div>
                        <div className="form-group">
                            <label>Response</label>
                            <textarea name="response" value={formData.response} onChange={handleChange}></textarea>
                        </div>
                        <button type="button" onClick={handleUpdateData}>Save and Close</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default GetDetails;
