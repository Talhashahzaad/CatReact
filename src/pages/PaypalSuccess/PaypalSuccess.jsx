import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./PaypalSuccess.css";
import { $siteURL } from "../../common/SiteURL";
import axios from "axios";

const PaypalSuccess = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState({});
    const [order_id, setOrderid] = useState({});
    const [package_id, setPackageid] = useState({});

    // PackageID get by import from Checkout
    const getSelectedPackageIdFromLocalStorage = () => {
        try {
            const storedPackageId = localStorage.getItem('selected_package_id');
            return storedPackageId || '';
        } catch (error) {
            console.error('Error retrieving package ID from localStorage:', error);
            console.log('Error retrieving package ID from localStorage:', error);
            return '';
        }
    };
    
    const parseToken = (token) => {
        if (token && token.startsWith('{')) {
            try {
                return JSON.parse(token);
            } catch (e) {
                return token;
            }
        }
        return token;
    };

    const handleError = (error) => {
        const errorMessage = error.response?.data?.message || 'Failed to fetch order details';
        setError(errorMessage);
        setLoading(false);
        
        // Fallback to using the values we have from localStorage/URL
        const urlParams = new URLSearchParams(window.location.search);
        setOrderid(urlParams.get('token') || '');
        setPackageid(urlParams.get('package_id') || getSelectedPackageIdFromLocalStorage());
    };

    const fetchOrderID = async () => {
        try {
            const token = localStorage.getItem('token');
            const role = localStorage.getItem('role');
            
            // Parse token if it's a JSON string
            let parsedToken;
            try {
                parsedToken = JSON.parse(token);
            } catch (e) {
                parsedToken = token;
            }
            
            const urlParams = new URLSearchParams(window.location.search);
            const orderIdFromUrl = urlParams.get('token') || '';
            const packageIdFromUrl = urlParams.get('package_id') || '';
            const response = await axios.get(
                `${$siteURL}/api/paypal/success?token=${orderIdFromUrl}&package_id=${packageIdFromUrl}`,
                {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${parsedToken}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                        'role': role
                    }
                }
            );
            
            setOrderid(response.data.order_id || orderIdFromUrl);
            setPackageid(response.data.package_id || packageIdFromUrl);
            setLoading(false);
            console.log(response.data, 'response');
            
        } catch (error) {
            handleError(error);
        }
    };
    
    useEffect(() => {
        fetchOrderID();
    }, []);
    
    return (
        <>
        <div className="paypal-success-container">
            <Container>
                <Row>
                    <Col xxl={12} xl={12} lg={12} md={12} sm={12} xs={12}>
                        <div className='paypal-success-container d-flex justify-content-center align-items-center flex-column py-5'>
                            {loading ? (
                                <h3>Loading payment information...</h3>
                            ) : error ? (
                                <h3 className="text-danger">{error}</h3>
                            ) : (
                                <>
                                    <h1 className="mb-0 display-3">Payment Received</h1>
                                    <h3 className="mb-0 display-6">your order id is {orderIdFromUrl}</h3>
                                    <h3 className="mb-0 display-6">your package id is {packageIdFromUrl}</h3>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%', transform: 'translate3d(0px, 0px, 0px)', contentVisibility: 'visible' }}>
                                        <defs>
                                            <clipPath id="lottieElement15809">
                                                <rect width="600" height="600" x="0" y="0"></rect>
                                            </clipPath>
                                            <clipPath id="lottieElement15820">
                                                <path d="M0,0 L600,0 L600,600 L0,600z"></path>
                                            </clipPath>
                                        </defs>
                                        <g clipPath="url(#lottieElement15809)">
                                            <g 
                                                style={{ 
                                                    transform: 'matrix(1.000001072883606,0,0,1.000001072883606,109.10980224609375,110.89579772949219)', 
                                                    opacity: '1', 
                                                    display: 'block' 
                                                }}
                                            >
                                                <g style={{ transform: "matrix(1,0,0,1,190.8780059814453,189.01499938964844)", opacity: '1', display: 'block'}}>
                                                    <path fill="#6c8b57" fillOpacity="1" d="M49.72800064086914,-183.89300537109375 C49.72800064086914,-183.89300537109375 75.947998046875,-160.86099243164062 75.947998046875,-160.86099243164062 C77.99700164794922,-159.06100463867188 80.46900177001953,-157.8090057373047 83.13400268554688,-157.2209930419922 C83.13400268554688,-157.2209930419922 117.2509994506836,-149.70399475097656 117.2509994506836,-149.70399475097656 C122.54299926757812,-148.53799438476562 126.89700317382812,-144.80099487304688 128.83399963378906,-139.75799560546875 C128.83399963378906,-139.75799560546875 141.32899475097656,-107.2490005493164 141.32899475097656,-107.2490005493164 C142.30499267578125,-104.70999908447266 143.91299438476562,-102.45700073242188 146,-100.7040023803711 C146,-100.7040023803711 172.73399353027344,-78.26399993896484 172.73399353027344,-78.26399993896484 C176.8800048828125,-74.78299713134766 178.9949951171875,-69.46099853515625 178.36000061035156,-64.10399627685547 C178.36000061035156,-64.10399627685547 174.26499938964844,-29.56800079345703 174.26499938964844,-29.56800079345703 C173.94500732421875,-26.8700008392334 174.31900024414062,-24.134000778198242 175.3520050048828,-21.617000579833984 C175.3520050048828,-21.617000579833984 188.5780029296875,10.605999946594238 188.5780029296875,10.605999946594238 C190.6280059814453,15.604000091552734 190.02000427246094,21.290000915527344 186.95700073242188,25.733999252319336 C186.95700073242188,25.733999252319336 167.21099853515625,54.388999938964844 167.21099853515625,54.388999938964844 C165.66900634765625,56.62799835205078 164.7239990234375,59.220001220703125 164.46499633789062,61.92399978637695 C164.46499633789062,61.92399978637695 161.15199279785156,96.5459976196289 161.15199279785156,96.5459976196289 C160.63800048828125,101.91799926757812 157.4459991455078,106.66500091552734 152.65699768066406,109.1780014038086 C152.65699768066406,109.1780014038086 121.78500366210938,125.38500213623047 121.78500366210938,125.38500213623047 C119.37300109863281,126.6510009765625 117.32499694824219,128.5070037841797 115.83300018310547,130.77999877929688 C115.83300018310547,130.77999877929688 96.74199676513672,159.87100219726562 96.74199676513672,159.87100219726562 C93.78099822998047,164.38299560546875 88.73500061035156,167.10499572753906 83.31700134277344,167.11199951171875 C83.31700134277344,167.11199951171875 48.38999938964844,167.15899658203125 48.38999938964844,167.15899658203125 C45.6619987487793,167.16200256347656 42.98099899291992,167.8560028076172 40.597999572753906,169.17599487304688 C40.597999572753906,169.17599487304688 10.10099983215332,186.07200622558594 10.10099983215332,186.07200622558594 C5.370999813079834,188.69200134277344 -0.3709999918937683,188.76400756835938 -5.177000045776367,186.26300048828125 C-5.177000045776367,186.26300048828125 -36.15700149536133,170.13800048828125 -36.15700149536133,170.13800048828125 C-38.57699966430664,168.8780059814453 -41.27799987792969,168.2530059814453 -44.005001068115234,168.31700134277344 C-44.005001068115234,168.31700134277344 -78.9209976196289,169.14599609375 -78.9209976196289,169.14599609375 C-84.33699798583984,169.27499389648438 -89.45999908447266,166.68099975585938 -92.5530014038086,162.24400329589844 C-92.5530014038086,162.24400329589844 -112.48899841308594,133.64199829101562 -112.48899841308594,133.64199829101562 C-114.0459976196289,131.40899658203125 -116.14800262451172,129.60400390625 -118.59600067138672,128.3990020751953 C-118.59600067138672,128.3990020751953 -149.93099975585938,112.97200012207031 -149.93099975585938,112.97200012207031 C-154.79200744628906,110.5790023803711 -158.1230010986328,105.91400146484375 -158.79299926757812,100.55799865722656 C-158.79299926757812,100.55799865722656 -163.11900329589844,66.03299713134766 -163.11900329589844,66.03299713134766 C-163.45700073242188,63.33599853515625 -164.4770050048828,60.76499938964844 -166.08399963378906,58.56700134277344 C-166.08399963378906,58.56700134277344 -186.66099548339844,30.417999267578125 -186.66099548339844,30.417999267578125 C-189.85299682617188,26.051000595092773 -190.6280059814453,20.382999420166016 -188.7239990234375,15.336000442504883 C-188.7239990234375,15.336000442504883 -176.44700622558594,-17.20599937438965 -176.44700622558594,-17.20599937438965 C-175.48800659179688,-19.74799919128418 -175.19400024414062,-22.493000030517578 -175.59300231933594,-25.18199920654297 C-175.59300231933594,-25.18199920654297 -180.69700622558594,-59.604000091552734 -180.69700622558594,-59.604000091552734 C-181.48899841308594,-64.94300079345703 -179.531005859375,-70.31500244140625 -175.48800659179688,-73.89800262451172 C-175.48800659179688,-73.89800262451172 -149.4219970703125,-97.0009994506836 -149.4219970703125,-97.0009994506836 C-147.38600158691406,-98.80599975585938 -145.843994140625,-101.09600067138672 -144.9429931640625,-103.66000366210938 C-144.9429931640625,-103.66000366210938 -133.40499877929688,-136.47000122070312 -133.40499877929688,-136.47000122070312 C-131.61599731445312,-141.55999755859375 -127.3740005493164,-145.40499877929688 -122.11699676513672,-146.7030029296875 C-122.11699676513672,-146.7030029296875 -88.23300170898438,-155.07400512695312 -88.23300170898438,-155.07400512695312 C-85.58599853515625,-155.7270050048828 -83.1510009765625,-157.04100036621094 -81.15599822998047,-158.89100646972656 C-81.15599822998047,-158.89100646972656 -55.619998931884766,-182.57200622558594 -55.619998931884766,-182.57200622558594 C-51.659000396728516,-186.24600219726562 -46.104000091552734,-187.6840057373047 -40.8390007019043,-186.39999389648438 C-40.8390007019043,-186.39999389648438 -6.89900016784668,-178.1199951171875 -6.89900016784668,-178.1199951171875 C-4.248000144958496,-177.4739990234375 -1.4759999513626099,-177.5070037841797 1.156000018119812,-178.22000122070312 C1.156000018119812,-178.22000122070312 34.84000015258789,-187.3489990234375 34.84000015258789,-187.3489990234375 C40.066001892089844,-188.76499938964844 45.6609992980957,-187.46600341796875 49.72800064086914,-183.89300537109375z"></path>
                                                </g>
                                            </g>
                                            <g style={{transform:"matrix(1,0,0,1,162.6219940185547,190.69100952148438)", opacity: '1', display: 'block'}}  >
                                                <g opacity="1" transform="matrix(1,0,0,1,137.3780059814453,109.30799865722656)">
                                                    <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10" stroke="rgb(245,244,250)" strokeOpacity="1" strokeWidth="21" d="M-84.87799835205078,0.6690000295639038 C-84.87799835205078,0.6690000295639038 -28.738000869750977,56.808998107910156 -28.738000869750977,56.808998107910156 C-28.738000869750977,56.808998107910156 46.80799865722656,-18.738000869750977 74.69499969482422,-46.625999450683594"></path>
                                                </g>
                                            </g>
                                            <g clipPath="url(#lottieElement15820)" style={{transform:"matrix(0.9399999976158142,0,0,0.9399999976158142,18,18)", opacity: '1', display: 'block'}} >
                                                <g transform="matrix(1,0,0,1,285.5,7.5)" opacity="1" style={{ display: 'none' }}>
                                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10" stroke="rgb(0,157,144)" strokeOpacity="1" strokeWidth="12" d="M0 0"></path>
                                                    </g>
                                                </g>
                                                <g transform="matrix(1,0,0,1,286,506)" opacity="1" style={{ display: 'none' }}>
                                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10" stroke="rgb(0,157,144)" strokeOpacity="1" strokeWidth="12" d="M0 0"></path>
                                                    </g>
                                                </g>
                                                <g transform="matrix(1,0,0,1,505.5,286)" opacity="1" style={{ display: 'none' }}>
                                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10" stroke="rgb(0,157,144)" strokeOpacity="1" strokeWidth="12" d="M0 0"></path>
                                                    </g>
                                                </g>
                                                <g transform="matrix(1,0,0,1,7,286.5)" opacity="1" style={{ display: 'none' }}>
                                                    <g opacity="1" transform="matrix(1,0,0,1,0,0)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10" stroke="rgb(0,157,144)" strokeOpacity="1" strokeWidth="12" d="M0 0"></path>
                                                    </g>
                                                </g>
                                                <g transform="matrix(1,0,0,1,441.31402587890625,441.46002197265625)" opacity="1" style={{ display: 'none' }}>
                                                    <g opacity="1" transform="matrix(1,0,0,1,26.860000610351562,26.860000610351562)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10" stroke="rgb(0,157,144)" strokeOpacity="1" strokeWidth="12" d="M0 0"></path>
                                                    </g>
                                                </g>
                                                <g transform="matrix(1,0,0,1,88.46800231933594,89.32099914550781)" opacity="1" style={{ display: 'none' }}>
                                                    <g opacity="1" transform="matrix(1,0,0,1,26.858999252319336,26.860000610351562)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10" stroke="rgb(0,157,144)" strokeOpacity="1" strokeWidth="12" d="M0 0"></path>
                                                    </g>
                                                </g>
                                                <g transform="matrix(1,0,0,1,440.96002197265625,88.96800231933594)" opacity="1" style={{ display: 'none' }}>
                                                    <g opacity="1" transform="matrix(1,0,0,1,26.860000610351562,26.858999252319336)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10" stroke="rgb(0,157,144)" strokeOpacity="1" strokeWidth="12" d="M0 0"></path>
                                                    </g>
                                                </g>
                                                <g transform="matrix(1,0,0,1,88.82099914550781,441.81298828125)" opacity="1" style={{ display: 'none' }}>
                                                    <g opacity="1" transform="matrix(1,0,0,1,26.858999252319336,26.860000610351562)">
                                                        <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="10" stroke="rgb(0,157,144)" strokeOpacity="1" strokeWidth="12" d="M0 0"></path>
                                                    </g>
                                                </g>
                                            </g>
                                            <g transform="matrix(1,0,0,1,300,300)" opacity="1" style={{ display: 'none' }}>
                                                <g opacity="1" transform="matrix(1,0,0,1,1.9299999475479126,-10.069999694824219)">
                                                    <path strokeLinecap="butt" strokeLinejoin="miter" fillOpacity="0" strokeMiterlimit="4" stroke="rgb(226,226,226)" strokeOpacity="1" strokeWidth="20" d="M0 0"></path>
                                                </g>
                                            </g>
                                        </g>
                                    </svg>

                                    <h4 className="b-0 pt-3 text-normal text-dark text-center lh-lg">
                                        Your payment has been received successfully. <br/>
                                        Welcome to the featured business listings.
                                    </h4>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
        </>
    );
};

export default PaypalSuccess;