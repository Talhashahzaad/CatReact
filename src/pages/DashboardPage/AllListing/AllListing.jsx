import React, { useState, useRef, useCallback, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import Sidebar from "../Sidebar/Sidebar";
import Breadcrumb from "../Breadcrumb/Breadcrumb";
import { FaEdit, FaTrash, FaRegSun, FaCaretLeft } from "react-icons/fa"; 
import defaultImage from "../../../images/default-profile-picture.webp";
import defaultThumbnailImage from "../../../images/defaulThumbnailBackground.png";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DashboardHeader from "../DashboardHeader/DashboardHeader";
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 
 
//import Select from 'react-select';
const AllListing = () => {

    //All listing pages
    const [bodyPicture,setBodyPicture] = useState(defaultImage);
    const [thumbnailImage, setThumbnailImage] = useState(defaultThumbnailImage);
    const [createListingData, setCreateListingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [description, setDescription] = useState('');
    const [entries, setEntries] = useState([5]);
    const [currentPage, setCurrentPage] = useState(1);
    const [entriesPerPage, setEntriesPerPage] = useState(5);
    const [search, setSearch] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [searchTerm, setSearchTerm] = useState(""); 
    const totalPages = Math.ceil(entries.length / entriesPerPage);
    const [value, setValue] = useState('');
    const [scrollPosition, setScrollPosition] = useState(0);
    const [content, setContent] = useState('');
    const [editorInitialized, setEditorInitialized] = useState(false);
    const [mediaFilesToggle, setMediaFilesToggle] = useState(false);
    const [imageGalleryToggle, setImageGalleryToggle] = useState(false);
    const [showListingForm, setShowListingForm] = useState(false);
    const [showImageGalleryForm, setShowImageGalleryForm] = useState(false);
    const [showVideoGalleryForm, setShowVideoGalleryForm] = useState(false);
    const [showScheduleTableForm, setShowScheduleTableForm] = useState(false);
    const [showScheduleEditableForm, setShowScheduleEditableForm] = useState(false);
    const editorRef = useRef(null);
    //Utility function to prevent auto-scrolling.
    const preventAutoScroll = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const currentScroll = window.scrollY;
        setScrollPosition(currentScroll);
        window.scrollTo(0, currentScroll);
    };
    //Handle Entries Per Page Change.
    const handleEntriesPerPageChange = useCallback((event) => {
        preventAutoScroll(event);
        setEntriesPerPage(parseInt(event.target.value));
    }, []);
    //Handle Search Per Page Change.
    const handleSearch = useCallback((value) => {
        setSearch(value);
    }, []);
    //Handle Previous Page Change.
    const handlePreviousPage = useCallback(() => {
        setCurrentPage(prev => prev - 1);
    }, []);
    //Handle Next Page Change.
    const handleNextPage = useCallback(() => {
        setCurrentPage(prev => prev + 1);
    }, []);
    //Handle Call Back Change.
    const handleImageChange = useCallback((event) => {
        preventAutoScroll(event);
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setBodyPicture(imageUrl);
        }
    }, []);
    //Handle Thumbnail Change.
    const handleThumbnailImageChange = useCallback((event) => {
        preventAutoScroll(event);
        const file = event.target.files[0];
        if (file) {
            const thumbnailImageUrl = URL.createObjectURL(file);
            setThumbnailImage(thumbnailImageUrl);
        }
    }, []);
   
    //Handle Description Change.
    const handleDescriptionChange = useCallback((value) => {
        setDescription(value);
    }, []);
    //Handle formData Set.
    const [formData, setFormData] = useState({
        title: '',
        categories: '',
        location: '',
        address: '',
        phoneNumber: '',
        emailAddress: '',
        websiteURL: '',
        facebookURL: '',
        instagramURL: '',
        tiktokURL: '',
        youtubeURL: '',
        professionalAffiliations: '',
        choosePractitioner: '',
        amenities: '',
        GoogleMapEmbedCode: '',
        Tags: '',
        seoTitle: '',
        seoDescription: '',
        status: '1',
        isFeatured: '',
        isVerified: ''

    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [title, setTitle] = useState('');
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
        categories: '',
        location: '',
        professionalAffiliations: '',
        choosePractitioner: '',
        amenities: '',
        loading: {
            categories: false,
            location: false
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
    //Fetch location
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
            // Fallback to empty array
            const locationData = Array.isArray(response.data) ? response.data : (response.data.data || []);
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
            const response = await axios.get('http://3.8.140.227:8000/api/professional-certificate', {
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
            const response = await axios.get('http://3.8.140.227:8000/api/practitioner',
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
    //Fetch amenities
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
    //Fetch amenities
    const fetchTags = async () => {
        try {
            setDropdownOptions(prev => ({
                ...prev,
                loading: { ...prev.loading, amenities: true },
                errors: { ...prev.errors, amenities: null }
            }));
            // Add this to your fetchCategories function temporarily
            const response = await axios.get('http://3.8.140.227:8000/api/tag'); 
            const fetchTagsData = Array.isArray(response.data) ? response.data : response.data || []; // Fallback to response.data.data or empty array
            setDropdownOptions(prev => ({
                ...prev,
                tag: fetchTagsData,
                loading: { ...prev.loading, tag: false }
            }));
        } catch (error) {
            setDropdownOptions(prev => ({
                ...prev,
                loading: { ...prev.loading, tag: false },
                errors: { ...prev.errors, tag: error.message }
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

    const [isReady, setIsReady] = useState(false);
    const [responseMessage, setResponseMessage] = useState('');

    // Add handler for editor initialization
    const handleEditorInitialized = (editor) => {
        if (editor) {
            editorRef.current = editor;
            setEditorInitialized(true);
        }
    };

    // Add handler for content change
    const handleContentChange = (newContent) => {
        if (newContent !== null && newContent !== undefined) {
            setValue(newContent);
            setContent(newContent);
        }
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

        // Safely append editor content
        if (content && content.trim() !== '') {
            formDataToSend.append('description', content);
        }

        // Append all other form data
        Object.entries(formData).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                formDataToSend.append(key, value);
            }
        });
        // Debugging: Log actual FormData contents
        //console.log('FormData entries:');
        // for (let [key, value] of formDataToSend.entries()) {
        //     console.log(key, value);
        // }
        // console.log(formDataToSend);
        
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
                setResponseMessage('Form Submitted successfully'); 
                //console.log('Form submitted successfully:', response.data.success);
               toast.success("Form Submitted syccessfully !");
                if (responseMessage) {
                    const timer = setTimeout(() => {
                        window.location.href = '/dashboard/all-listing';
                    }, 500);
                    return () => clearTimeout(timer);
                } 
            } else {
                //console.log('Form submitted with errors:', response.data.errors);
                toast.error("Form submitted with errors:", response.data.errors);
            }

            // You might want to redirect or show a success message here 
        } catch (err) {
            console.log('Data:', formDataToSend);
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
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };
    //Get List
    const navigate = useNavigate();
    // Fetch data with token
    const fetchListingData = async () => {
        setLoading(true);
        setError(null);
        try {
            //const token = JSON.parse(localStorage.getItem("token"));
            const token = (localStorage.getItem("token"));
            if (!token) {
                navigate('/login');
                return;
            }
            const parsedToken = JSON.parse(token);
            const response = await axios.get(`http://3.8.140.227:8000/api/listing?page=${currentPage}&per_page=${entriesPerPage}`, {
                headers: {
                    'Authorization': `Bearer ${parsedToken}`,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
                }
            });
            //  console.log('Create listing API Response:', response.data); 
            if (response.data.listings) {
                setCreateListingData(response.data.listings);
                setTotalPages(response.data.listings.last_page || 1);
                setTotalEntries(response.data.listings.total || 0);
            } else {
                setError('Invalid data format received from server');
            }
        } catch (error) {
            if (error.response?.status === 401) {
                localStorage.removeItem("token");
                navigate('/login');
            }
            setError(error.message || 'Failed to fetch practitioner data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchListingData();
        fetchTags();
        
        // Cleanup function
        return () => {
            if (editorRef.current) {
                editorRef.current.destroy();
                editorRef.current = null;
            }
        };
    }, [currentPage, entriesPerPage]); 

    // Ensure createListingData is an array (fallback to empty array if not)
    const safeListingData = Array.isArray(createListingData) ? createListingData : [];
    //console.log("safeListingData:",safeListingData);

    // Sort the data (if needed) - now working with a guaranteed array
    const sortedData = [...safeListingData].sort((a, b) => b.id - a.id); 

    // Then filter the sorted data
    const filteredEntries = sortedData.filter(listings => 
        listings.description?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        listings.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Calculate totals based on filtered data
    const totalFilteredEntries = filteredEntries.length;
    const totalFilteredPages = Math.ceil(totalFilteredEntries / entriesPerPage);

    // Calculate pagination
    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    const currentEntries = filteredEntries.slice(indexOfFirstEntry, indexOfLastEntry); 

    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    
        const toggleSidebar = () => {
            setIsSidebarOpen(!isSidebarOpen);
        }

    return (
        <>
            <Container fluid className="dashboard-page-main">
                <Row>
                    <div className={`dashboard-page-section w-100 h-auto d-flex justify-content-between align-items-start ${isSidebarOpen ? "sidebar-open" : "sidebar-close"}`} 
                    onClick={(e) => e.stopPropagation()}>
                        <Sidebar />

                        <div className="dashboard-content">
                        <button className="btn btn-primary toggle-sidebar-btn-dashboard" onClick={toggleSidebar}>
                            <FaArrowRight className={`${isSidebarOpen ? "d-none" : "d-block"}`} />
                            <FaArrowLeft className={`${isSidebarOpen ? "d-block" : "d-none"}`} />
                        </button>
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
                                                    document.querySelector('.dashboard-content-table ').style.display = 'none';
                                                    document.querySelector('.sidebar-listing-form').style.display = 'block';
                                                    document.querySelector('.sidebar-image-gallery-form').style.display = 'none';
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
                                            <select 
                                                id="entriesPerPage"
                                                onChange={handleEntriesPerPageChange}
                                                className={`setEntriesPerPage ${entriesPerPage}`} 
                                                defaultValue={entriesPerPage}
                                                name="entriesPerPage">
                                                <option value="5">5</option>
                                                <option value="10">10</option>
                                                <option value="15">15</option>
                                                <option value="20">20</option>
                                            </select> 
                                        </Col>
                                        <Col xxl={3} xl={3} lg={3} md={3} sm={12} className="text-end border rounded-2">
                                            <input type="text" placeholder="Search..." value={searchTerm} onChange={handleSearchChange} id="practitionerSearch" name="practitionerSearch" autoComplete="off"
                                            />
                                        </Col> 
                                    </Row>
                                    <div className="table-main-div">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>id</th> 
                                                <th>Title</th> 
                                                <th>Email</th> 
                                                <th>Phone</th>  
                                                <th>Address</th> 
                                                <th>Status</th>  
                                                <th>Ation</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {currentEntries.map((entry, index) => (
                                                <tr key={index}>
                                                    <td>{entry.id}</td> 
                                                    <td>{entry.title}</td>  
                                                    <td>{entry.email}</td>
                                                    <td>{entry.phone}</td>   
                                                    <td>{entry.address}</td> 
                                                    <td>Active</td> 
                                                    <td>
                                                        <button className="btn btn-success"><FaEdit /></button>
                                                        <button className="btn btn-danger"><FaTrash /></button>
                                                        <button className="btn btn-dark position-relative" onClick={(e) => {
                                                            setMediaFilesToggle(mediaFilesToggle === entry.id ? null : entry.id);
                                                            e.stopPropagation();
                                                        }}>
                                                            <FaCaretLeft /><FaRegSun />

                                                            <div className={`media-files ${mediaFilesToggle === entry.id ? 'd-flex' : 'd-none'}`} onClick={(e) => e.stopPropagation()}>
                                                                <button className="media-files-link" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShowListingForm(false);
                                                                    setShowImageGalleryForm(true);
                                                                    document.querySelector('.dashboard-content-table').style.display = 'none';
                                                                    document.querySelector('.sidebar-image-gallery-form').style.display = 'block';
                                                                }}>image gallery</button>
                                                                <button className="media-files-link" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShowListingForm(false);
                                                                    setShowVideoGalleryForm(true);
                                                                    document.querySelector('.dashboard-content-table').style.display = 'none';
                                                                    document.querySelector('.sidebar-video-gallery-form').style.display = 'block';
                                                                }}>video gallery</button>
                                                                <button className="media-files-link" onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    setShowListingForm(false);
                                                                    setShowScheduleTableForm(true);
                                                                    document.querySelector('.dashboard-content-table').style.display = 'none';
                                                                    document.querySelector('.sidebar-schedule-table-form').style.display = 'block';
                                                                }}>schedule</button>
                                                            </div>
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center pagination-controls">
                                        <div>Showing {indexOfFirstEntry + 1} to {Math.min(indexOfLastEntry, entries.length)} of {totalFilteredEntries} entries</div>
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
                                                                    value={formData.category || ''}
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
                                                                    value={formData.location || ''}
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
                                                                <input type="text" autoComplete="off" className="form-control" id="address" name="address" onChange={(e) => {
                                                                    preventAutoScroll(e);
                                                                    setFormData({ ...formData, address: e.target.value });
                                                                }} required />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                            <div className="form-group my-2">
                                                                <label htmlFor="phone" className="form-label text-capitalize fw-bold small">phone number <sup className="text-danger">*</sup></label>
                                                                <input type="tel" autoComplete="off" minLength={7} maxLength={12} className="form-control" id="phone" name="phone" onChange={(e) => {
                                                                    preventAutoScroll(e);
                                                                    setFormData({ ...formData, phone: e.target.value });
                                                                }} required />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                            <div className="form-group my-2">
                                                                <label htmlFor="email" className="form-label text-capitalize fw-bold small">email address <sup className="text-danger">*</sup></label>
                                                                <input type="email" autoComplete="off" className="form-control" id="email" name="email" onChange={(e) => {
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
                                                                }} />
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
                                                                }} />
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
                                                                <select id="professionalAffiliations" name="professionalAffiliations" className="form-control text-capitalize" value={formData.professionalAffiliations || ''} onChange={(e) => {
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
                                                                <select id="choosePractitioner"
                                                                        name="choosePractitioner"
                                                                        className="form-control text-capitalize"
                                                                        value={formData.choosePractitioner || ''}
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
                                                                <select id="amenities"
                                                                    name="amenities"
                                                                    className="form-control text-capitalize"
                                                                    value={formData.amenities || ''}
                                                                    onChange={(e) => {
                                                                        preventAutoScroll(e);
                                                                        handleChange(e);
                                                                    }}
                                                                    required
                                                                >
                                                                    <option value="">Select a Amenities</option>
                                                                    {!dropdownOptions.loading.fetchAmenities &&
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
                                                                {editorInitialized && (
                                                                    <FroalaEditorComponent
                                                                        tag='textarea'
                                                                        model={value}
                                                                        onModelChange={handleContentChange}
                                                                        onInitialized={handleEditorInitialized}
                                                                        config={{
                                                                            placeholderText: 'Enter your description here...',
                                                                            heightMin: 200,
                                                                            heightMax: 400,
                                                                            toolbarButtons: [
                                                                                'bold', 'italic', 'underline', 'strikeThrough',
                                                                                '|', 'fontFamily', 'fontSize', 'color',
                                                                                '|', 'align', 'formatOL', 'formatUL',
                                                                                '|', 'insertLink', 'insertImage', 'insertTable',
                                                                                '|', 'undo', 'redo'
                                                                            ],
                                                                            initOnClick: true,
                                                                            key: 'editor-key'
                                                                        }}
                                                                    />
                                                                )}
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
                                                            <div className="form-group my-2">
                                                                <label htmlFor="tag" className="form-label text-capitalize fw-bold small">Tags</label>
                                                                <select id="tag"
                                                                    name="Tags"
                                                                    className="form-control"
                                                                    value={formData.Tags || ''}
                                                                    onChange={(e) => {
                                                                        preventAutoScroll(e);
                                                                        handleChange(e);
                                                                    }}
                                                                    required
                                                                >
                                                                    <option value="">Select a Tag</option> 
                                                                    {!dropdownOptions.loading.tag &&
                                                                        Array.isArray(dropdownOptions.tag) &&
                                                                        dropdownOptions.tag.map(tags => (
                                                                            <option key={tags.id} value={tags.id}>
                                                                                {tags.name}
                                                                            </option>
                                                                        ))
                                                                    }
                                                                </select>
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
                                {/* sidebar listing form end here */}


                                {/* image gallery start here */}
                                <div className="sidebar-image-gallery-form" style={{ display: showImageGalleryForm ? 'block' : 'none' }} onClick={(e) => e.stopPropagation()}>
                                    <div className="sidebar-image-gallery-form-header">
                                        <Row>
                                            <div className="d-flex justify-content-flex-start align-items-center listing-header">
                                                <button className="btn bg-jetGreen all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2"
                                                    onClick={() => {
                                                        document.querySelector('.dashboard-content-table').style.display = 'block';
                                                        document.querySelector('.sidebar-image-gallery-form').style.display = 'none';
                                                    }}
                                                >
                                                    <span className="all-listing-create-form-back-button-arrow">&larr;</span> Back
                                                </button>
                                                <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">listing image gallery</h2>
                                            </div>
                                        </Row>
                                        <hr />
                                        <div className="dashboard-all-listing-create-form-body">
                                            <div className="form-container">
                                                <form onSubmit={(event) => {
                                                    event.preventDefault();
                                                    handleSubmit(event);
                                                }}>
                                                    <Row>
                                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                            <div className="form-group my-2">
                                                                <label htmlFor="selectImages" className="form-label text-capitalize fw-bold small">image <samp className="text-danger small fw-normal">(multi images supported)</samp> </label>
                                                                <input type="file" className="form-control" id="selectImages" name="selectImages" multiple />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                            <div className="form-group my-2">
                                                                <input type="submit" className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3" value="Upload" onClick={handleSubmit} />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                            <div className="form-group my-2">
                                                                <strong className="form-label text-capitalize fw-bold small lh-lg w-100 h-auto d-block">all images</strong>
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr>
                                                                            <th>ID</th>
                                                                            <th>Image</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td className="w-25">1</td>
                                                                            <td className="w-50"><img src={defaultThumbnailImage} alt="image" /></td>
                                                                            <td className="w-25">
                                                                                <button className="btn btn-sm btn-danger"><FaTrash /></button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* image gallery end here */}


                                {/* video gallery start here */}
                                <div className="sidebar-video-gallery-form" style={{ display: showVideoGalleryForm ? 'block' : 'none' }} onClick={(e) => e.stopPropagation()}>
                                    <div className="sidebar-video-gallery-form-header">
                                        <Row>
                                            <div className="d-flex justify-content-flex-start align-items-center listing-header">
                                                <button className="btn bg-jetGreen all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2"
                                                    onClick={() => {
                                                        document.querySelector('.dashboard-content-table').style.display = 'block';
                                                        document.querySelector('.sidebar-video-gallery-form').style.display = 'none';
                                                    }}
                                                >
                                                    <span className="all-listing-create-form-back-button-arrow">&larr;</span> Back
                                                </button>
                                                <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">listing video gallery</h2>
                                            </div>
                                        </Row>
                                        <hr />
                                        <div className="dashboard-all-listing-create-form-body">
                                            <div className="form-container">
                                                <form onSubmit={(event) => {
                                                    event.preventDefault();
                                                    handleSubmit(event);
                                                }}>
                                                    <Row>
                                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                            <div className="form-group my-2">
                                                                <label htmlFor="selectVideos" className="form-label text-capitalize fw-bold small">video URL </label>
                                                                <input type="text" className="form-control" id="selectVideos" name="selectVideos" />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={4} xl={4} lg={4} md={4} sm={12}>
                                                            <div className="form-group my-2">
                                                                <input type="submit" className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3" value="Upload" onClick={handleSubmit} />
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                            <div className="form-group my-2">
                                                                <strong className="form-label text-capitalize fw-bold small lh-lg w-100 h-auto d-block">all videos</strong>
                                                                <table className="table table-bordered">
                                                                    <thead>
                                                                        <tr className="text-capitalize">
                                                                            <th>ID</th>
                                                                            <th>thumbnail</th>
                                                                            <th>URL</th>
                                                                            <th>Action</th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        <tr>
                                                                            <td valign="middle" className="w-25">1</td>
                                                                            <td valign="middle" className="w-50"><img src={defaultThumbnailImage} alt="video thumbnail" /></td>
                                                                            <td valign="middle" className="w-25">https://www.youtube.com/watch?v=dQw4w9WgXcQ</td>
                                                                            <td valign="middle" className="w-25">
                                                                                <button className="btn btn-sm btn-danger"><FaTrash /></button>
                                                                            </td>
                                                                        </tr>
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* video gallery end here */}



                                {/* schedule table start here */}
                                <div className="sidebar-schedule-table-form" style={{ display: showScheduleTableForm ? 'block' : 'none' }} onClick={(e) => e.stopPropagation()}>
                                    <div className="sidebar-schedule-table-form-header">
                                        <Row>
                                            <div className="d-flex justify-content-flex-start align-items-center listing-header">
                                                <button className="btn bg-jetGreen all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2"
                                                    onClick={() => {
                                                        document.querySelector('.dashboard-content-table').style.display = 'block';
                                                        document.querySelector('.sidebar-schedule-table-form').style.display = 'none';
                                                    }}
                                                >
                                                    <span className="all-listing-create-form-back-button-arrow">&larr;</span> Back
                                                </button>
                                                <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">listing schedule</h2>
                                            </div>
                                        </Row>
                                        <hr />
                                        <div className="dashboard-all-listing-create-form-body">
                                            <div className="form-container">
                                                <Row>
                                                    <div className="d-flex justify-content-between align-items-center listing-header">
                                                        <strong className="dashboard-content-title mb-0 h3 fw-bold text-capitalize headingFont">all schedule</strong>
                                                        <button 
                                                            className="bg-jetGreen all-listing-create-button d-flex align-items-center justify-content-center border-0 text-white py-2 px-3 h6" 
                                                            onClick={() => {
                                                                document.querySelector('.dashboard-content-table').style.display = 'none';
                                                                document.querySelector('.sidebar-schedule-table-form').style.display = 'none';
                                                                document.querySelector('.sidebar-schedule-editable-form').style.display = 'block';
                                                            }}
                                                        >
                                                            <span className="all-listing-create-button-plus">&#43;</span> Create  
                                                        </button>
                                                    </div>
                                                </Row>
                                                <hr/>
                                                
                                                <Row className="d-flex justify-content-between align-items-center mb-3">
                                                    <Col>
                                                        <label htmlFor="entriesPerPage">Show entries:</label>
                                                        <select
                                                            id="entriesPerPage"
                                                            onChange={handleEntriesPerPageChange}
                                                            className={`setEntriesPerPage ${entriesPerPage}`}
                                                            defaultValue={entriesPerPage}
                                                        >
                                                            <option value={5}>5</option>
                                                            <option value={10}>10</option>
                                                            <option value={15}>10</option>
                                                            <option value={20}>20</option>
                                                        </select>
                                                    </Col>
                                                    <Col xxl={3} xl={3} lg={3} md={3} sm={12} className="text-end border rounded-2">
                                                        <label htmlFor="search-input" className="visually-hidden">Search treatments</label>
                                                        <input 
                                                            type="search" 
                                                            placeholder="Search..." 
                                                            value={searchTerm} 
                                                            onChange={handleSearchChange} 
                                                            id="search-input"
                                                            name="search-input"
                                                        />
                                                    </Col>
                                                </Row>

                                                <table className="table table-bordered">
                                                    <thead>
                                                        <tr className="text-capitalize">
                                                            <th>ID</th>
                                                            <th>date</th>
                                                            <th>start date</th>
                                                            <th>end date</th>
                                                            <th>status</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr>
                                                            <td>1</td>
                                                            <td>2024-01-01</td>
                                                            <td>10:00 AM</td>
                                                            <td>11:00 AM</td>
                                                            <td>active</td>
                                                        </tr>
                                                    </tbody>
                                                </table>

                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div>
                                                        Showing 0 to 5 entries
                                                    </div>
                                                    <div>
                                                        <button className="btn btn-previous">Previous</button>
                                                        <span> Page 0 of 1 </span>
                                                        <button className="btn btn-next">Next</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* schedule table end here */}




                                {/* create schedule form start here */}
                                <div className="sidebar-schedule-editable-form" style={{ display: showScheduleEditableForm ? 'block' : 'none' }} onClick={(e) => e.stopPropagation()}>
                                    <div className="sidebar-schedule-editable-form-header">
                                        <Row>
                                            <div className="d-flex justify-content-flex-start align-items-center listing-header">
                                                <button className="btn bg-jetGreen all-listing-create-button all-listing-create-form-back-button text-capitalize d-flex align-items-center justify-content-center me-2"
                                                    onClick={() => {
                                                        document.querySelector('.sidebar-schedule-editable-form').style.display = 'none';
                                                        document.querySelector('.sidebar-schedule-table-form').style.display = 'block';
                                                    }}
                                                >
                                                    <span className="all-listing-create-form-back-button-arrow">&larr;</span> Back
                                                </button>
                                                <h2 className="dashboard-all-listing-create-form-title mb-0 h5 fw-bold default-font text-capitalize">All schedule</h2>
                                            </div>
                                        </Row>
                                        <hr />
                                        <div className="dashboard-all-listing-create-form-body">
                                            <div className="form-container">
                                                <Row>
                                                    <div className="d-flex justify-content-between align-items-center listing-header">
                                                        <strong className="dashboard-content-title mb-3 h3 fw-bold text-capitalize headingFont">create listing schedule</strong>
                                                    </div>
                                                </Row>

                                                <form>
                                                    <Row>
                                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                            <div className="form-group my-2">
                                                                <label htmlFor="date" className="form-label text-capitalize fw-bold small">days <sup className="text-danger small fw-normal">*</sup></label>
                                                                <select name="date" id="date" className="form-control text-capitalize">
                                                                    <option value="">choose</option>
                                                                    <option value="monday">monday</option>
                                                                    <option value="tuesday">tuesday</option>
                                                                    <option value="wednesday">wednesday</option>
                                                                    <option value="thursday">thursday</option>
                                                                    <option value="friday">friday</option>
                                                                    <option value="saturday">saturday</option>
                                                                    <option value="sunday">sunday</option>
                                                                </select>
                                                            </div>
                                                        </Col>

                                                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                            <div className="form-group my-2">
                                                                <label htmlFor="startTime" className="form-label text-capitalize fw-bold small">start time <sup className="text-danger small fw-normal">*</sup></label>
                                                                <select name="startTime" id="startTime" className="form-control text-capitalize">
                                                                    <option value="">choose</option>
                                                                    <option value="09:00 AM">09:00 AM</option>
                                                                    <option value="10:00 AM">10:00 AM</option>
                                                                    <option value="11:00 AM">11:00 AM</option>
                                                                    <option value="12:00 PM">12:00 PM</option>
                                                                    <option value="01:00 PM">01:00 PM</option>
                                                                    <option value="02:00 PM">02:00 PM</option>
                                                                    <option value="03:00 PM">03:00 PM</option>
                                                                    <option value="04:00 PM">04:00 PM</option>
                                                                    <option value="05:00 PM">05:00 PM</option>
                                                                    <option value="06:00 PM">06:00 PM</option>
                                                                    <option value="07:00 PM">07:00 PM</option>
                                                                    <option value="08:00 PM">08:00 PM</option>
                                                                    <option value="09:00 PM">09:00 PM</option>
                                                                    <option value="10:00 PM">10:00 PM</option>
                                                                    <option value="11:00 PM">11:00 PM</option>
                                                                    <option value="12:00 AM">12:00 AM</option>
                                                                    <option value="01:00 AM">01:00 AM</option>
                                                                    <option value="02:00 AM">02:00 AM</option>
                                                                    <option value="03:00 AM">03:00 AM</option>
                                                                    <option value="04:00 AM">04:00 AM</option>
                                                                    <option value="05:00 AM">05:00 AM</option>
                                                                    <option value="06:00 AM">06:00 AM</option>
                                                                    <option value="07:00 AM">07:00 AM</option>
                                                                    <option value="08:00 AM">08:00 AM</option>
                                                                </select>
                                                            </div>
                                                        </Col>

                                                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                            <div className="form-group my-2">
                                                                <label htmlFor="endTime" className="form-label text-capitalize fw-bold small">end time <sup className="text-danger small fw-normal">*</sup></label>
                                                                <select name="endTime" id="endTime" className="form-control text-capitalize">
                                                                    <option value="">choose</option>
                                                                    <option value="09:00 AM">09:00 AM</option>
                                                                    <option value="10:00 AM">10:00 AM</option>
                                                                    <option value="11:00 AM">11:00 AM</option>
                                                                    <option value="12:00 PM">12:00 PM</option>
                                                                    <option value="01:00 PM">01:00 PM</option>
                                                                    <option value="02:00 PM">02:00 PM</option>
                                                                    <option value="03:00 PM">03:00 PM</option>
                                                                    <option value="04:00 PM">04:00 PM</option>
                                                                    <option value="05:00 PM">05:00 PM</option>
                                                                    <option value="06:00 PM">06:00 PM</option>
                                                                    <option value="07:00 PM">07:00 PM</option>
                                                                    <option value="08:00 PM">08:00 PM</option>
                                                                    <option value="09:00 PM">09:00 PM</option>
                                                                    <option value="10:00 PM">10:00 PM</option>
                                                                    <option value="11:00 PM">11:00 PM</option>
                                                                    <option value="12:00 AM">12:00 AM</option>
                                                                    <option value="01:00 AM">01:00 AM</option>
                                                                    <option value="02:00 AM">02:00 AM</option>
                                                                    <option value="03:00 AM">03:00 AM</option>
                                                                    <option value="04:00 AM">04:00 AM</option>
                                                                    <option value="05:00 AM">05:00 AM</option>
                                                                    <option value="06:00 AM">06:00 AM</option>
                                                                    <option value="07:00 AM">07:00 AM</option>
                                                                    <option value="08:00 AM">08:00 AM</option>
                                                                </select>
                                                            </div>
                                                        </Col>

                                                        <Col xxl={12} xl={12} lg={12} md={12} sm={12}>
                                                            <div className="form-group my-2">
                                                                <label htmlFor="status" className="form-label text-capitalize fw-bold small">status <sup className="text-danger small fw-normal">*</sup></label>
                                                                <select name="status" id="status" className="form-control text-capitalize">
                                                                    <option value="">choose</option>
                                                                    <option value="active">active</option>
                                                                    <option value="inactive">inactive</option>
                                                                </select>
                                                            </div>
                                                        </Col>


                                                        <Col xxl={6} xl={6} lg={6} md={6} sm={12}>
                                                            <div className="form-group my-2">
                                                                <input type="submit" className="text-white rounded-0 bg-jetGreen border-0 py-2 px-3" value="Create" />
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* create schedule form end here */}
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </>
    );
}
export default AllListing;