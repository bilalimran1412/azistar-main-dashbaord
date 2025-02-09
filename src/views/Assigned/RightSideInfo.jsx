import React, { useState } from 'react';
import TabComponent from '../../components/TabComponent/Tab';
import { LocationIcon, UserIcons, PhoneIcon, LEDIcon, IpIcon, TagICon, FileIcon, Copy } from '../Unassigned/icons';

const RightSideInfo = ({ customers, selectedCustomer, customerInfo, handleChange, loading, setLoading, setCustomerInfo }) => {
    const baseURL = process.env.REACT_APP_API_BASE_URL;

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        setLoading(true);
    
        try {
            const response = await fetch(`${baseURL}/customers/update_customer/${selectedCustomer}`, {
                method: 'PUT', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(customerInfo), 
            });
    
            if (!response.ok) {
                throw new Error('Failed to update customer info');
            }
    
            const updatedAgent = await response.json();
            console.log('Update successful:', updatedAgent);
            setCustomerInfo(updatedAgent.customer);
            // setActiveClass('success_active');
            // setConfirmationMessage('Customer updated successfully');
        } catch (error) {
            console.error('Error updating customer info:', error);
            // setActiveClass('error_active');
            // setConfirmationMessage('Error updating customer info');
        } finally {
            setTimeout(() => {
            setLoading(false);
            // setActiveClass('');
                // setConfirmationMessage('');
            }, 2000);
        }
    };

    const tabs = [
        {
            label: 'Basic Info',
            icon: <UserIcons />,
            content: (
                <form onSubmit={handleSubmit}>
                        <p>
                            <UserIcons/>
                            <input
                                type="email"
                                placeholder='Email'
                                name="email"
                                value={customerInfo.email}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <LocationIcon/>
                            <input
                                type="text"
                                placeholder='Location'
                                name="location"
                                value={customerInfo.location}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <PhoneIcon/>
                            <input
                                type="tel"
                                name="phone"
                                placeholder='Phone Number'
                                value={customerInfo.phone}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <UserIcons/>
                            <input
                                type="text"
                                placeholder='First Name'
                                name="first_name"
                                value={customerInfo.first_name}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <UserIcons/>
                            <input
                                type="text"
                                placeholder='Last Name'
                                name="last_name"
                                value={customerInfo.last_name}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <LEDIcon/>
                            <input
                                type="text"
                                placeholder='Browser'
                                name="browser"
                                value={customerInfo.browser}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <IpIcon/>
                            <input
                                type="text"
                                placeholder='Ip Address'
                                name="ip_address"
                                value={customerInfo.ip_address}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <TagICon/>
                            <input
                                type="text"
                                placeholder='Custom Tag'
                                name="custom_tags"
                                value={customerInfo.custom_tags}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <FileIcon/>
                            <input
                                type="text"
                                placeholder='Custom Properties'
                                name="custom_properties"
                                value={customerInfo.custom_properties}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <FileIcon/>
                            <input
                                type="text"
                                placeholder='Custom Information'
                                name="custom_information"
                                value={customerInfo.custom_information}
                                onChange={handleChange}
                            />
                        </p>

                        <p>
                            <Copy/>
                            <input
                                type="text"
                                placeholder='Visitors Satisfaction'
                                name="visitors"
                                value={customerInfo.visitors}
                                onChange={handleChange}
                            />
                        </p>
                        <p>
                            <Copy/>
                            <textarea
                                type="text"
                                placeholder='Final Features 5 '
                                name="final_features"
                                value={customerInfo.final_features}
                                onChange={handleChange}
                            />
                        </p>
                        <button className='add_new_deta' disabled={loading} type="submit">
                            {loading ? 'Updating...' : 'Save'}
                        </button>
                    </form>
            ),
        },
        {
            label: 'Notes',
            icon: <FileIcon />,
            content: (
                    <form onSubmit={handleSubmit}>
                        <p>
                            <FileIcon />
                        <textarea
                            type="text"
                            placeholder='Notes'
                            name="notes"
                            value={customerInfo.notes}
                            onChange={handleChange}
                        />
                        </p>
                        <button className='add_new_deta' disabled={loading} type="submit">
                            {loading ? 'Updating...' : 'Save'}
                        </button>
                        </form>
            ),
        },
    ];

    return (
        <div className='customer_info'>
            {/* Right Sidebar (Customer Info) */}
            {customers.length > 0 && selectedCustomer && customerInfo && (
                    <>
                    <h3>Customer Info</h3>
                    <TabComponent tabs={tabs} />
                    {/* <p className={`${setActiveClass} notify_message`}>{setConfirmationMessage}</p> */}
                    </>
            )}
        </div>
    );
};

export default RightSideInfo;
