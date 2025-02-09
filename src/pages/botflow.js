// pages/diagram.js
import React, { useEffect, useState } from 'react';

const BotFlow = () => {
    const [nodes, setNodes] = useState([]); // Updated to hold nodes directly
    const [edges, setEdges] = useState([]); // Updated to hold nodes directly
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const baseURL = process.env.REACT_APP_API_BASE_URL;

    useEffect(() => {
        const getData = async () => {
            try {
                const userId = localStorage.getItem('userId'); // Get userId from local storage
                const token = localStorage.getItem('token');

                const res = await fetch(`${baseURL}/bot/listbots/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });

                if (!res.ok) {
                    throw new Error(`Failed to fetch data: ${res.statusText}`);
                }

                const responseData = await res.json();
                
                if (
                    responseData.data &&
                    Array.isArray(responseData.data) &&
                    responseData.data.length > 0
                  ) {
                    // Assuming there is only one object with nodes and edges, extract it
                    const diagramData = responseData.data[0]; // Or use a loop if you expect more than one
          
                    const nodes = diagramData.nodes || [];
                    const edges = diagramData.edges || [];
          
                    setNodes(nodes);  // Set the nodes
                    setEdges(edges);
                    console.log('Nodes:', nodes);
                    console.log('Edges:', edges);
                  }else {
                    throw new Error('No diagram data available');
                }
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getData();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (nodes.length === 0) {
        return <div>No diagram data available.</div>;
    }

    return (
        <div className='flex fix'>
            <div>
            <h1>Diagram</h1>
            {nodes.map(node => (
                <div key={node.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <h2>{node.label || 'Untitled Node'}</h2>
                    <p><strong>Position:</strong> x: {node.position.x}, y: {node.position.y}</p>
                    <p><strong>Type:</strong> {node.type}</p>
                    {node.buttons && node.buttons.length > 0 && (
                        <div>
                            <h4>Buttons:</h4>
                            <ul>
                                {node.buttons.map(button => (
                                    <li key={button.id}>{button.text} (Style: {button.buttonStyle})</li>
                                ))}
                            </ul>
                        </div>
                    )}
                    {node.additionalData && (
                        <div>
                            <h4>Additional Data:</h4>
                            <pre>{JSON.stringify(node.additionalData, null, 2)}</pre>
                        </div>
                    )}

                </div>
            ))}
            </div>
            <div>
            <h2>Edges</h2>
            {edges.map(edge => (
                <div key={edge.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
                    <p><strong>Source:</strong> {edge.source}</p>
                    <p><strong>Target:</strong> {edge.target}</p>
                    <p><strong>Label:</strong> {edge.label || 'No label'}</p>
                    {edge.additionalData && (
                        <div>
                            <h4>Additional Data:</h4>
                            <pre>{JSON.stringify(edge.additionalData, null, 2)}</pre>
                        </div>
                    )}
                </div>
            ))}
            </div>
        </div>
    );
};

export default BotFlow;
