import React, { useState, useRef, useCallback, useEffect } from "react"; 
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { FaEdit, FaTrash } from "react-icons/fa";
import defaultImage from "../../../images/defaultPicture.jpg";
import defaultThumbnailImage from "../../../images/defaultPicture.jpg";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import axios from 'axios';
//import Select from 'react-select'; 


const AllListing = () => {

    const [bodyPicture, setBodyPicture] = useState(defaultImage);
    const [thumbnailImage, setThumbnailImage] = useState(defaultThumbnailImage);
    const [description, setDescription] = useState('');
    const [entries, setEntries] = useState([5]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    //const wysiwygRef = useRef(null); 
    const indexOfLastEntry  = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries    = entries.slice(indexOfFirstEntry, indexOfLastEntry);
    const totalPages        = Math.ceil(entries.length / entriesPerPage); 
    const [value, setValue] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0); 
     
    // Utility function to prevent auto-scrolling
    const preventAutoScroll = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const currentScroll = window.scrollY;
        setScrollPosition(currentScroll);
        window.scrollTo(0, currentScroll);
    };

    const handleEntriesPerPageChange = useCallback((event) => {
        preventAutoScroll(event);
        setEntriesPerPage(parseInt(event.target.value));
    }, []);

    const handleSearch = useCallback((value) => {
        setSearch(value);
    }, []);

    const handlePreviousPage = useCallback(() => {
        setCurrentPage(prev => prev - 1);
    }, []);

    const handleNextPage = useCallback(() => {
        setCurrentPage(prev => prev + 1);
    }, []);

    const handleImageChange = useCallback((event) => {
        preventAutoScroll(event);
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBodyPicture(imageUrl);
        }
    }, []);

    const handleThumbnailImageChange = useCallback((event) => {
        preventAutoScroll(event);
        const file = event.target.files[0];
        if (file) {
            const thumbnailImageUrl = URL.createObjectURL(file);
            setThumbnailImage(thumbnailImageUrl);
        }
    }, []);

    const handleDescriptionChange = useCallback((value) => {
        setDescription(value);
    }, []); 
    
    const [formData, setFormData] = useState({
        title: '',
        categories: [],
        location: [],
        address: '',
        phoneNumber: '',
        emailAddress: '',
        websiteURL: '',
        facebookURL: '',
        instagramURL: '',
        tiktokURL: '',
        youtubeURL: '',
        professionalAffiliations: [],
        choosePractitioner: [],
        amenities: [],
        GoogleMapEmbedCode: '',
        Tags: [],
        seoTitle: '',
        seoDescription: '',
        status: '1',
        isFeatured: '',
        isVerified: '' 

    });  
    // State for files and images
    // const [bodyPicture, setBodyPicture] = useState(null);
    // const [bodyPicturePreview, setBodyPicturePreview] = useState('');
    // const [thumbnailImage, setThumbnailImage] = useState(null);
    // const [thumbnailImagePreview, setThumbnailImagePreview] = useState('');
    // const [attachment, setAttachment] = useState(null); 
    // const [description, setDescription] = useState(''); 
    const [isSubmitting, setIsSubmitting]   = useState(false);
    const [error, setError]                 = useState(null); 
    const [title, setTitle]                 = useState('');   
    // Handle attachment upload
    const handleAttachmentChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAttachment(file);
        }
        e.preventDefault();
    };
    // Dropdown options state
    const [dropdownOptions, setDropdownOptions] = useState({
        categories: [], 
        location:[],
        professionalAffiliations:[],
        choosePractitioner:[],
        amenities:[],
        loading: {
            categories: false,
            location:false 
        },
        errors: {
            categories: null,
            location: null,
             
        }
    });
    // Fetch all dropdown data on component mount
    useEffect(() => {
            fetchCategories(); 
            fetchLocation();
            fetchProfessionalAffiliations();
            fetchPractitioners();
            fetchAmenities();
    }, []);
    // API fetch functions
    const fetchCategories = async () => {
        try {
            setDropdownOptions(prev => ({
                ...prev,
                loading: { ...prev.loading, categories: true },
                errors: { ...prev.errors, categories: null }
            })); 
            // Add this to your fetchCategories function temporarily
            const response = await axios.get('http://3.8.140.227:8000/api/category');
            // console.log('Category API Response Structure:', response);
            // console.log('Category API Response Is Array:', Array.isArray(   ));
            // console.log('Category API Response Data:', response.data.category);
            // Ensure we're working with an array
            const categoriesData = Array.isArray(response.data) ? response.data : response.data || []; // Fallback to response.data.data or empty array
          
          setDropdownOptions(prev => ({
            ...prev,
            categories: categoriesData,
            loading: { ...prev.loading, categories: false }
          }));
        } catch (error) {
          setDropdownOptions(prev => ({
            ...prev,
            loading: { ...prev.loading, categories: false },
            errors: { ...prev.errors, categories: error.message }
          }));
        }
    }; 
    const fetchLocation = async () => {
    try {
        setDropdownOptions(prev => ({
        ...prev,
        loading: { ...prev.loading, location: true },  // Changed to 'locations'
        errors: { ...prev.errors, location: null }    // Changed to 'locations'
        }));  
        const response = await axios.get('http://3.8.140.227:8000/api/location');
        // console.log('Location API Response Structure:', response);
        // console.log('Location API Response Is Array:', Array.isArray(response.data));
        // console.log('Location API Response Data:', response.data);
        // Handle different response structures
        const locationData = Array.isArray(response.data) 
        ? response.data 
        : (response.data.data || []); // Fallback to empty array
        
        setDropdownOptions(prev => ({
        ...prev,
        location: locationData,  // Changed to 'locations'
        loading: { ...prev.loading, location: false }  // Changed to 'locations'
        }));
        
    } catch (error) {
        setDropdownOptions(prev => ({
            ...prev,
            loading: { ...prev.loading, location: false },
            errors: { ...prev.errors, location: error.message }
          }));
    }
    }; 
    //Fetch Professional Affiliations
    const fetchProfessionalAffiliations = async () => {
        
        try {

            setDropdownOptions(prev => ({
                    ...prev,
                    loading: { ...prev.loading, professionalAffiliations: true },
                    errors: { ...prev.errors, professionalAffiliations: null }
            })); 
            const token = (localStorage.getItem("token"));
            if (!token) {
                navigate('/login');
                return;
            }
            const parsedToken = JSON.parse(token);
            //Add this to your fetchCategories function temporarily
            const response = await axios.get('http://3.8.140.227:8000/api/professional-certificate',{
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                }
             }); 
            // console.log('Practitioner certificate API Response Structure:', response);
            // console.log('Practitioner certificate Is Array:', Array.isArray(response.data.certificate));
            // console.log('Practitioner certificate Data:', response.data.certificate);
            // Ensure we're working with an array
            const professionalAffiliationsData = Array.isArray(response.data.certificate) ? response.data.certificate : response.data.certificate || []; // Fallback to response.data.data or empty array
          
          setDropdownOptions(prev => ({
            ...prev,
            professionalAffiliations: professionalAffiliationsData,
            loading: { ...prev.loading, professionalAffiliations: false }
          }));
          const handleChange = (e) => {
            setSelectedValue(e.target.value);
          };
        } catch (error) {
          setDropdownOptions(prev => ({
            ...prev,
            loading: { ...prev.loading, professionalAffiliations: false },
            errors: { ...prev.errors, professionalAffiliations: error.message }
          }));
        }
    }; 
    //Fetch Practictioners
    const fetchPractitioners = async () => {
        try { 
            //Set 
            setDropdownOptions(prev => ({
                ...prev,
                loading: { ...prev.loading, fetchPractitioners: true },
                errors: { ...prev.errors, fetchPractitioners: null }
            })); 
            // Add this to your fetch categories function temporarily.
            const token = (localStorage.getItem("token"));
            if (!token) {
                navigate('/login');
                return;
            } 
            const parsedToken = JSON.parse(token);
            // Add this to your fetch categories function temporarily.
            const response = await axios.get('http://3.8.140.227:8000/api/practitioner' , 
            {
                        headers: {
                            'Authorization': `Bearer ${parsedToken}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*',
                            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                        }
             });
            // console.log('Practitioner API Response Structure:', response);
            // console.log('Practitioner Is Array:', Array.isArray(response.data));
            // console.log('Practitioner Data:', response.data);
            // Ensure we're working with an array
            const fetchPractitioner = Array.isArray(response.data) ? response.data : response.data || []; // Fallback to response.data.data or empty array
          
          setDropdownOptions(prev => ({
            ...prev,
            choosePractitioner: fetchPractitioner,
            loading: { ...prev.loading, choosePractitioner: false }
          }));
        } catch (error) {
          setDropdownOptions(prev => ({
            ...prev,
            loading: { ...prev.loading, choosePractitioner: false },
            errors: { ...prev.errors, choosePractitioner: error.message }
          }));
        }
    };
    const fetchAmenities = async () => {
        try {
          setDropdownOptions(prev => ({
            ...prev,
            loading: { ...prev.loading, amenities: true },
            errors: { ...prev.errors, amenities: null }
          })); 
            // Add this to your fetchCategories function temporarily
            const response = await axios.get('http://3.8.140.227:8000/api/amenity');
            // console.log('Amenities API Response Structure:', response);
            // console.log('Amenities Is Array:', Array.isArray(response.data));
            // console.log('Amenities Data:', response.data.amenity);
            // Ensure we're working with an array
            const fetchAmenitiesData = Array.isArray(response.data) ? response.data : response.data || []; // Fallback to response.data.data or empty array
            setDropdownOptions(prev => ({
                ...prev,
                amenities: fetchAmenitiesData,
                loading: { ...prev.loading, amenities: false }
            }));
        } catch (error) {
          setDropdownOptions(prev => ({
            ...prev,
            loading: { ...prev.loading, amenities: false },
            errors: { ...prev.errors, amenities: error.message }
          }));
        }
    }; 

    // Handle form input changes
    const handleChange = (e) => {
        preventAutoScroll(e);
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };  
    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null); 
    
        // Create FormData object
        const formDataToSend = new FormData(); 
        
        // Append files with checks
        if (bodyPicture instanceof File) {
            formDataToSend.append('bodyPicture', bodyPicture);
        }
        if (thumbnailImage instanceof File) {
            formDataToSend.append('thumbnailImage', thumbnailImage);
        }
        if (attachment instanceof File) {
            formDataToSend.append('attachment', attachment);
        } 
        // Append text fields
        // formDataToSend.append('description', description || ''); // Ensure not undefined 
        // Append all other form data
        Object.entries(formData).forEach(([key, value]) => {
            // Skip if value is undefined or null
            if (value !== undefined && value !== null) {
                formDataToSend.append(key, value);
            }
        });  
        // Debugging: Log actual FormData contents
        console.log('FormData entries:');
        for (let [key, value] of formDataToSend.entries()) {
            console.log(key, value);
        }
        console.log(formDataToSend);  
        try {  
            const token = localStorage.getItem("token");
            if (!token) {
                navigate('/login');
                return;
            } 
    
            const parsedToken = JSON.parse(token); 
    
            const response = await axios.post('http://3.8.140.227:8000/api/listing', formDataToSend, {
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                }
            });
    
            // Handle successful submission
            if (response.data.success === true) {
                console.log('Form submitted successfully:', response.data.success);
            } else {
                console.log('Form submitted with errors:', response.data.errors);
            }
    
            // You might want to redirect or show a success message here 
        } catch (err) { 
            console.log('Data:',formDataToSend);
            console.error('Error submitting form:', err);
            setError(err.response?.data?.message || 'An error occurred while submitting the form');
        } finally {
            setIsSubmitting(false);
        }
    };
    // Handle item deletion
    const handleDelete = async (id) => {
            if (window.confirm('Are you sure you want to delete this item?')) {
                setIsLoading(true);
            try {
                // Simulate API call
                await new Promise(resolve => setTimeout(resolve, 300)); 
                // Filter out the deleted item
                setItems(items.filter(item => item.id !== id));
            } catch (err) {
                setError('Failed to delete item');
            } finally {
                setIsLoading(false);
            }
        }
    };  
    return (
        <>
            <Container fluid className="dashboard-page-main">
                <Row>
                    <div className="dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start pb-5" onClick={(e) => e.stopPropagation()}>
                        <Sidebar />

                        <div className="dashboard-content">
                            <div className="dashboard-content-body">
                                <DashboardHeader />

                                <div className="dashboard-content-breadcrumbs w-100 h-auto d-block py-3 px-2 position-relative bg-green25 mb-3 rounded">
                                    <Breadcrumb />
                                </div>

                                <div className="dashboard-content-table">
                                    <Row>
                                        <div className="d-flex justify-content-between align-items-center listing-header">
                                            <h1 className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">All Listing</h1>
                                            <button 
                                                className="bg-jetGreen all-listing-create-button d-flex align-items-center justify-content-center border-0 text-white py-2 px-3 h6" 
                                                onClick={() => {
                                                    document.querySelector('.dashboard-content-table').style.display = 'none';
                                                    document.querySelector('.sidebar-listing-form').style.display = 'block';
                                                }}
                                            >
                                                <span className="all-listing-create-button-plus">&#43;</span> Create   
                                            </button>
                                        </div>
                                    </Row>
                                    <hr />

                                    <Row className="d-flex justify-content-between align-items-center mb-3">    
                                        <Col>
                                            <label htmlFor="entriesPerPage">Show entries:</label>
                                            <select id="entriesPerPage" onChange={handleEntriesPerPageChange} value={entriesPerPage}>
                                                <option value={5}>5</option>
                                                <option value={10}>10</option>
                                                <option value={20}>20</option>
                                            </select>
                                        </Col>
                                        <Col xxl={3} xl={3} lg={3} md={3} sm={12} className="text-end border rounded-2">
                                            <input 
                                                type="text" 
                                                placeholder="Search..." 
                                                onChange={(e) => handleSearch(e.target.value)} 
                                                value={search}
                                            />
                                        </Col>
                                    </Row> 
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>image</th>
                                                <th>title</th>
                                                <th>category</th>
                                                <th>location</th>
                                                <th>status</th>
                                                <th>is featured</th>
                                                <th>is verified</th>
                                                <th>by</th>
                                                <th>action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentEntries.map((entry, index) => (
                                                <tr key={index}>
                                                    <td>{entry.id}</td>
                                                    <td><img src={entry.image} alt="" className="img-fluid" /></td>
                                                    <td>{entry.title}</td>
                                                    <td>{entry.category}</td>
                                                    <td>{entry.location}</td>
                                                    <td>{entry.status}</td>
                                                    <td>{entry.isFeatured ? <span className="badge bg-success">yes</span> : <span className="badge bg-danger">no</span>}</td>
                                                    <td>{entry.isVerified ? <span className="badge bg-success">yes</span> : <span className="badge bg-danger">no</span>}</td>
                                                    <td>{entry.by}</td>
                                                    <td>
                                                        <button className="btn btn-success"><FaEdit /></button>
                                                        <button className="btn btn-danger"><FaTrash /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="d-flex justify-content-between align-items-center pagination-controls">
                                        <div>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, entries.length)} of {entries.length} entries</div>
                                        <div>
                                            <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn btn-previous">Previous</button>
                                            <span className="pagination-controls-page-number">Page {currentPage} of {totalPages}</span>
                                            <button onClick={handleNextPage} disabled={currentPage === totalPages} className="btn btn-next">Next</button>
                                        </div>
                                    </div>
                                </div>  
                                
                                <div className="sidebar-listing-form">
                                    <div className="dashboard-all-listing-create-form">
                                        <Row>
                                            <div className="d-flex justify-content-flex-start align-items-center listing-header">
                                                <button className="btn bg-jetGreen all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2" 
                                                    onClick={() => {
                                                        document.querySelector('.sidebar-listing-form').style.display = 'none';
                                                        document.querySelector('.dashboard-content-table').style.display = 'block';
                                                    }}
                                                >
                                                <span className="all-listing-create-form-back-button-arrow">&larr;</span> Back 
                                                </button>
                                                <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">create listing</h2>
                                            </div>
                                        </Row>
                                        <hr /> 
                                        <div className="dashboard-all-listing-create-form-body">
                                        <div className="form-container" style={{ height: '80vh', overflowY: 'auto', overflowX: 'hidden' }}>
                                         <form onSubmit={(event) => {
                                            event.preventDefault();
                                            handleSubmit(event);
                                         }}>
                                                <Row>  
                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="bodyPicture" className="form-label text-capitalize fw-bold small">body picture <sup className="text-danger">*</sup></label>
                                                            <div className="dashboard-all-listing-create-form-body-row-image-upload position-relative">
                                                                <img src={bodyPicture} alt="" className="img-fluid all-listing-create-form-body-row-image-upload-img" />
                                                                <input 
                                                                    type="file" 
                                                                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0 all-listing-create-form-body-row-image-upload-input" 
                                                                    title="Choose Your Image" 
                                                                    id="bodyPicture"
                                                                    name="bodyPicture"
                                                                    onChange={(e) => {
                                                                        preventAutoScroll(e);
                                                                        handleImageChange(e);
                                                                    }}
                                                                    required

                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="thumbnailImage" className="form-label text-capitalize fw-bold small">background image <sup className="text-danger">*</sup></label>
                                                            <div className="dashboard-all-listing-create-form-body-row-image-upload position-relative">
                                                                <img src={thumbnailImage} alt="" className="img-fluid all-listing-create-form-body-row-image-upload-img" />
                                                                <input 
                                                                    type="file" 
                                                                    className="position-absolute top-0 start-0 w-100 h-100 opacity-0 all-listing-create-form-body-row-image-upload-input" 
                                                                    title="Choose Your Image" 
                                                                    id="thumbnailImage"
                                                                    name="thumbnailImage"
                                                                    onChange={(e) => {
                                                                        preventAutoScroll(e);
                                                                        handleThumbnailImageChange(e);
                                                                    }}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="title" className="form-label text-capitalize fw-bold small">title <sup className="text-danger">*</sup></label>
                                                            <input type="text" className="form-control" id="title" name="title" onChange={(e) => {
                                                                preventAutoScroll(e);
                                                                setFormData({ ...formData, title: e.target.value });
                                                            }} required />
                                                        </div>
                                                    </Col>

                                                    
                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="category" className="form-label text-capitalize fw-bold small">category <sup className="text-danger">*</sup></label> 
                                                           <select  
                                                                placeholder="Search and select..." 
                                                                id="category"
                                                                name="category"
                                                                className="form-control text-capitalize w-full p-2 border rounded"
                                                                value={formData.category || []}
                                                                onChange={(e) => {
                                                                    preventAutoScroll(e);
                                                                    handleChange(e);
                                                                }} 
                                                                required
                                                            >
                                                            <option value="">Select a category</option>
                                                            {dropdownOptions.loading.categories && (
                                                                <option disabled>Loading...</option>
                                                            )}
                                                            {!dropdownOptions.loading.categories && 
                                                                Array.isArray(dropdownOptions.categories) && 
                                                                dropdownOptions.categories.map(category => (
                                                                <option key={category.id} value={category.id}>
                                                                    {category.name}
                                                                </option>
                                                                ))
                                                            } 
                                                            </select> 
                                                        </div> 
                                                    </Col>  

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}> 
                                                        <div className="form-group my-2">
                                                            <label htmlFor="category" className="form-label text-capitalize fw-bold small">Location <sup className="text-danger">*</sup></label>  
                                                            <select
                                                             
                                                            id="location"
                                                            name="location"
                                                            className="form-control text-capitalize w-full p-2 border rounded"
                                                            value={formData.location || []}
                                                            onChange={(e) => {
                                                                preventAutoScroll(e);
                                                                handleChange(e);
                                                            }} 
                                                            required
                                                            >
                                                            <option value="">Select a location</option> 
                                                                {!dropdownOptions.loading.location && 
                                                                    Array.isArray(dropdownOptions.location) && 
                                                                    dropdownOptions.location.map(location => (
                                                                    <option key={location.id} value={location.id}>
                                                                        {location.name}
                                                                    </option>
                                                                    ))
                                                                } 
                                                            </select> 
                                                        </div>  
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="address" className="form-label text-capitalize fw-bold small">full address <sup className="text-danger">*</sup></label>
                                                            <input type="text" className="form-control" id="address" name="address" onChange={(e) => {
                                                                preventAutoScroll(e);
                                                                setFormData({ ...formData, address: e.target.value });
                                                            }} required />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="phone" className="form-label text-capitalize fw-bold small">phone number <sup className="text-danger">*</sup></label>
                                                            <input type="tel" minLength={7} maxLength={12} className="form-control" id="phone" name="phone" onChange={(e) => {
                                                                preventAutoScroll(e);
                                                                setFormData({ ...formData, phone: e.target.value });
                                                            }} required />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="email" className="form-label text-capitalize fw-bold small">email address <sup className="text-danger">*</sup></label>
                                                            <input type="email" className="form-control" id="email" name="email" onChange={(e) => {
                                                                preventAutoScroll(e);
                                                                setFormData({ ...formData, email: e.target.value });
                                                            }} required />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="websiteURL" className="form-label text-capitalize fw-bold small">website URL</label>
                                                            <input type="url" className="form-control" id="websiteURL" name="websiteURL" onChange={(e) => {
                                                                preventAutoScroll(e);
                                                                setFormData({ ...formData, websiteURL: e.target.value });
                                                            }}  />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="facebookURL" className="form-label text-capitalize fw-bold small">facebook URL</label>
                                                            <input type="url" className="form-control" id="facebookURL" name="facebookURL" onChange={(e) => {
                                                                preventAutoScroll(e);
                                                                setFormData({ ...formData, facebookURL: e.target.value });
                                                            }} />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="instagramURL" className="form-label text-capitalize fw-bold small">instagram URL</label>
                                                            <input type="url" className="form-control" id="instagramURL" name="instagramURL" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, instagramURL: e.target.value });
                                                            }}  />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="tiktokURL" className="form-label text-capitalize fw-bold small">tiktok URL</label>
                                                            <input type="url" className="form-control" id="tiktokURL" name="tiktokURL" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, tiktokURL: e.target.value });
                                                            }} />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={3} xl={3} lg={3} md={3} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="youtubeURL" className="form-label text-capitalize fw-bold small">youtube URL</label>
                                                            <input type="url" className="form-control" id="youtubeURL" name="youtubeURL" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, youtubeURL: e.target.value });
                                                            }} />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="professionalAffiliations" className="form-label text-capitalize fw-bold small">Professional Affiliations</label> 
                                                            <select id="professionalAffiliations" name="professionalAffiliations"    className="form-control text-capitalize" value={formData.professionalAffiliations || []}  onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                handleChange(e);
                                                            }} required>
                                                                <option value="">Select a Affiliations</option> 
                                                                    {!dropdownOptions.loading.professionalAffiliations && 
                                                                        Array.isArray(dropdownOptions.professionalAffiliations) && 
                                                                        dropdownOptions.professionalAffiliations.map(professionalAffiliation => (
                                                                        <option key={professionalAffiliation.id} value={professionalAffiliation.id}>
                                                                            {professionalAffiliation.name}
                                                                        </option>
                                                                        ))
                                                                    } 
                                                            </select> 
                                                        </div>
                                                    </Col> 

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="attachment" className="form-label text-capitalize fw-bold small">attachment</label>
                                                            <input type="file" className="form-control form-inside-file" id="attachment" name="attachment" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, attachment: e.target.value });
                                                            }} />
                                                        </div>
                                                    </Col>

                                                 
                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                        <label htmlFor="choosePractitioner" className="form-label text-capitalize fw-bold small">Choose Practitioner</label>
                                                            <select 
                                                                id="choosePractitioner" 
                                                                name="choosePractitioner" 
                                                                className="form-control text-capitalize" 
                                                                value={formData.choosePractitioner || []} 
                                                                onChange={(e) => {
                                                                    preventAutoScroll(e);
                                                                    handleChange(e);
                                                                }} 
                                                                required
                                                            >
                                                                <option value="">Select a Practioners</option> 
                                                                    {!dropdownOptions.loading.choosePractitioner && 
                                                                        Array.isArray(dropdownOptions.choosePractitioner) && 
                                                                        dropdownOptions.choosePractitioner.map(Practitioner => (
                                                                        <option key={Practitioner.id} value={Practitioner.id}>
                                                                            {Practitioner.name}
                                                                        </option>
                                                                        ))
                                                                    } 
                                                            </select> 
                                                        </div>
                                                    </Col>  

                                                    <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                        <div className="form-group my-2">
                                                        <label htmlFor="amenities" className="form-label text-capitalize fw-bold small">Choose Amenities</label>
                                                            <select 
                                                                id="amenities" 
                                                                name="amenities" 
                                                                className="form-control text-capitalize" 
                                                                value={formData.amenities || []} 
                                                                onChange={(e) => {
                                                                    preventAutoScroll(e);
                                                                    handleChange(e);
                                                                }} 
                                                                required
                                                            >
                                                                <option value="">Select a Amenities</option> 
                                                                    {!dropdownOptions.loading.fetchAmenities  && 
                                                                        Array.isArray(dropdownOptions.amenities) && 
                                                                        dropdownOptions.amenities.map(amenitie => (
                                                                        <option key={amenitie.id} value={amenitie.id}>
                                                                            {amenitie.name}
                                                                        </option>
                                                                        ))
                                                                    } 
                                                            </select> 
                                                        </div>
                                                    </Col> 

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2 react-quill-editor" id="react-quill-editor-element">
                                                            <label htmlFor="froalaRefDescription" className="form-label text-capitalize fw-bold small">
                                                                description<sup className="text-danger">*</sup>
                                                            </label>
                                                            <FroalaEditorComponent 
                                                                tag='textarea'
                                                                model={value} 
                                                            />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2 react-quill-editor">
                                                            <label htmlFor="GoogleMapEmbedCode" className="form-label text-capitalize fw-bold small">Google Map Embed Code<sup className="text-danger">*</sup></label>
                                                            <textarea className="form-control google-map-embed-code" id="GoogleMapEmbedCode" name="GoogleMapEmbedCode" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, GoogleMapEmbedCode: e.target.value });
                                                            }} required></textarea>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2 react-quill-editor">
                                                            <label htmlFor="Tags" className="form-label text-capitalize fw-bold small">tags</label>
                                                            <input type="text" className="form-control" id="Tags" name="Tags" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, Tags: e.target.value });
                                                            }} />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2 react-quill-editor">
                                                            <label htmlFor="seoTitle" className="form-label text-capitalize fw-bold small">seo title<sup className="text-danger">*</sup></label>
                                                            <input type="text" className="form-control" id="seoTitle" name="seoTitle" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, seoTitle: e.target.value });
                                                            }} required />
                                                        </div>
                                                    </Col>

                                                    <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                        <div className="form-group my-2 react-quill-editor">
                                                            <label htmlFor="seoDescription" className="form-label text-capitalize fw-bold small">SEO Description<sup className="text-danger">*</sup></label>
                                                            <textarea className="form-control google-map-embed-code" id="seoDescription" name="seoDescription" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, description: e.target.value });
                                                            }} required></textarea>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="status" className="form-label text-capitalize fw-bold small">status <sup className="text-danger">*</sup></label>
                                                            <select name="status" id="status" className="form-control text-capitalize" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, status: e.target.value });
                                                            }} required>
                                                                <option value="1">active</option>
                                                                <option value="0">inactive</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="isFeatured" className="form-label text-capitalize fw-bold small">is featured</label>
                                                            <select name="isFeatured" id="isFeatured" className="form-control text-capitalize" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, is_featured: e.target.value });
                                                            }}>
                                                                <option value="">no</option>
                                                                <option value="1">yes</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                        <div className="form-group my-2">
                                                            <label htmlFor="isVerified" className="form-label text-capitalize fw-bold small">is verified</label>
                                                            <select name="isVerified" id="isVerified" className="form-control text-capitalize" onChange={(e) => {
                                                                preventAutoScroll(e); 
                                                                setFormData({ ...formData, is_verified: e.target.value });
                                                            }}>
                                                                <option value="">no</option>
                                                                <option value="1">yes</option>
                                                            </select>
                                                        </div>
                                                    </Col>

                                                    <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                        <div className="form-group my-2">
                                                            <input type="submit" className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3" value="Create" onClick={handleSubmit} />
                                                        </div>
                                                    </Col>
                                                </Row>
                                         </form>
                                         </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    );
}

export default AllListing;