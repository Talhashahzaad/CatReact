import react, { useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import "./ProductListing.css";
import "./index.min.js";
import searchIcon from "../../images/searchIcon.svg";
import categoriesIcon from "../../images/categoriesIcon.svg";
import mapMarkerIcon from "../../images/mapMarkerIcon.svg";

const ProductListing = () => {
    async function initMap() {
        // Request needed libraries.
        const { Map, InfoWindow } = await google.maps.importLibrary("maps");
        const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
          "marker",
        );
        const map = new google.maps.Map(document.getElementById("map"), {
          zoom: 3,
          center: { lat: -28.024, lng: 140.887 },
          mapId: "DEMO_MAP_ID",
        });
        const infoWindow = new google.maps.InfoWindow({
          content: "",
          disableAutoPan: true,
        });
        // Create an array of alphabetical characters used to label the markers.
        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        // Add some markers to the map.
        const markers = locations.map((position, i) => {
          const label = labels[i % labels.length];
          const pinGlyph = new google.maps.marker.PinElement({
            glyph: label,
            glyphColor: "white",
          });
          const marker = new google.maps.marker.AdvancedMarkerElement({
            position,
            content: pinGlyph.element,
          });
      
          // markers can only be keyboard focusable when they have click listeners
          // open info window when marker is clicked
          marker.addListener("click", () => {
            infoWindow.setContent(position.lat + ", " + position.lng);
            infoWindow.open(map, marker);
          });
          return marker;
        });
      
        // Add a marker clusterer to manage the markers.
        new MarkerClusterer({ markers, map });
      }
      
      const locations = [
        { lat: -31.56391, lng: 147.154312 },
        { lat: -33.718234, lng: 150.363181 },
        { lat: -33.727111, lng: 150.371124 },
        { lat: -33.848588, lng: 151.209834 },
        { lat: -33.851702, lng: 151.216968 },
        { lat: -34.671264, lng: 150.863657 },
        { lat: -35.304724, lng: 148.662905 },
        { lat: -36.817685, lng: 175.699196 },
        { lat: -36.828611, lng: 175.790222 },
        { lat: -37.75, lng: 145.116667 },
        { lat: -37.759859, lng: 145.128708 },
        { lat: -37.765015, lng: 145.133858 },
        { lat: -37.770104, lng: 145.143299 },
        { lat: -37.7737, lng: 145.145187 },
        { lat: -37.774785, lng: 145.137978 },
        { lat: -37.819616, lng: 144.968119 },
        { lat: -38.330766, lng: 144.695692 },
        { lat: -39.927193, lng: 175.053218 },
        { lat: -41.330162, lng: 174.865694 },
        { lat: -42.734358, lng: 147.439506 },
        { lat: -42.734358, lng: 147.501315 },
        { lat: -42.735258, lng: 147.438 },
        { lat: -43.999792, lng: 170.463352 },
      ];

      useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg&v=weekly`;
        script.async = true;
        script.onload = initMap;
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return (
        <>
            <div className="w-100 h-auto py-5 d-block text-center text-capitalize mb-0">
                <h1 className="mb-0">Feature Product Listing</h1>
            </div>

            <Container>
                <Row className="justify-content-center productListingSearch-box">
                    <Col xxl={10} offset-xxl={1} xl={10} offset-xl={1} lg={10} offset-lg={1} md={12} sm={12} xs={12}>
                        <form>
                            <Row>
                                <div className="searchBox w-100 bg-white py-0 position-relative d-flex align-items-center justify-content-between">
                                    <span className="searchForTreatment">
                                        <img loding="lazy" src={searchIcon} alt="search" />
                                        <input type="text" placeholder="Search for treatment" id="searchForTreatment" name="searchForTreatment" required="required" />
                                    </span>

                                    <span className="selectYourCategories">
                                        <img loding="lazy" src={categoriesIcon} alt="search" />
                                        <select id="selectYourCategories" name="selectYourCategories" required="required">
                                            <option value="hair">
                                                Hair Services
                                            </option>
                                            <option value="nails">
                                                Nail Services
                                            </option>
                                            <option value="spa">
                                                Spa & Wellness
                                            </option>
                                            <option value="skincare">
                                                Skincare
                                            </option>
                                            <option value="barber">
                                                Barber Services
                                            </option>
                                            <option value="makeup">
                                                Makeup Services
                                            </option>
                                        </select>
                                    </span>

                                    <span className="searchByLocation">
                                        <img loding="lazy" src={mapMarkerIcon} alt="Location" />
                                        <input type="text" placeholder="Location" id="searchByLocation" name="searchByLocation" required="required" />
                                    </span>

                                    <span className="submitYourData">
                                        <button type="submit"><img loding="lazy" src={searchIcon} alt="search" /> <span className="searchButtonText text-white ps-2">Search</span></button>
                                    </span>
                                </div>
                            </Row>
                        </form>
                    </Col>
                </Row>
            </Container>

            <div className="listing-and-map-box">
                <div className="listing-box">
                    <div className="listing-box-header">
                        <h2>Listing</h2>
                    </div>
                </div>
                
                <div className="map-box">
                    <div id="map"></div>
                </div>
            </div>
        </>
    )
}

export default ProductListing;