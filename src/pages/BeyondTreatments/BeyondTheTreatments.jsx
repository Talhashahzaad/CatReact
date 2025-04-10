import React, { useState, useEffect } from 'react';
import beyondTreatments from '../../images/beyondTheTreatments.jpg';
import { Container, Row, Col } from 'react-bootstrap';
import './BeyondTheTreatments.css';
import axios from 'axios';

const BeyondTheTreatments = () => {
    const [clipList, setClipList] = useState([]);
    const [error, setError] = useState(null);

    const getYouTubeEmbedUrl = (url) => {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) 
            ? `https://www.youtube.com/embed/${match[2]}`
            : url;
    };

    const fetchClipList = async () => {
        try {
            const response = await axios.get(`http://3.8.140.227:8000/api/cat-video-upload`);
            setClipList(response.data);
            if (response.data.length === 0) {
                setError("No, clip has been uploaded yet.");
            }else{
                setError(null);
            }
        } catch (error) {
            setError(error || 'No, clip has been uploaded yet.');
        }
    }

    useEffect(() => {
        fetchClipList();
    }, []);
    

    return (
        <>
            <div className='beyond-treatments-banner position-relative'>
                <img src={beyondTreatments} alt='beyondTreatments' />
                <div className='position-absolute top-50 start-50 translate-middle text-center'>
                    <h1 className='text-white fw-normal'>Beyond The Treatments</h1>
                </div>
            </div>
            
            <div className='beyond-treatments-clips position-relative w-100 h-auto d-block pt-5'>
                <Container>
                    <Row>
                        {clipList.map((clipListing, index) => (
                            <Col xxl={6} xl={6} lg={6} md={12} sm={12} xs={12} className='pb-5' key={index}>
                                <div className='beyond-treatments-clips-item'>
                                    <h3 className='text-black text-lowercase h4 mb-3'>{clipListing.video_title}</h3><hr />
                                    <p>{clipListing.video_description}</p>
                                    <div className="video-container position-relative height-0 overflow-hidden">
                                        <iframe 
                                            src={getYouTubeEmbedUrl(clipListing.video_url)} 
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                border: 'none'
                                            }}
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                            title={clipListing.video_title}
                                        ></iframe>
                                    </div>
                                </div>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </>
    );
};

export default BeyondTheTreatments;