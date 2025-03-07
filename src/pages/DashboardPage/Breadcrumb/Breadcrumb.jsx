import { React } from "react";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const Breadcrumb = () => {
    const breadcrumbs = useBreadcrumbs();
    return <div>{breadcrumbs.map(({ match, breadcrumb }) => (
        <span key={match.pathname}>{breadcrumb}</span>
    ))}</div>;
}

export default Breadcrumb;