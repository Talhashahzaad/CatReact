import React from 'react';

const routes = [
    { path: '/dashboard', name: 'Dashboard', element: Dashboard },
    { path: '/dashboard/all-listing', name: 'All Listing', element: All-Listing },
    { path: '/dashboard/amenity', name: 'Amenity', element: Amenity },
    { path: '/dashboard/location', name: 'Location', element: Locations },
    { path: '/dashboard/practitioner-qualifications', name: 'Practitioner Qualification', element: Practitioner-Qualification },
    { path: '/dashboard/tags', name: 'Tags', element: Tags },
    { path: '/dashboard/treatment-categories', name: 'Treatment Categories', element: Treatment-Categories },
    { path: '/dashboard/treatment-packages', name: 'Treatment Packages', element: Treatment-Packages },
    { path: '/dashboard/treatments', name: 'Treatment', element: Treatments }
]

export default routes;