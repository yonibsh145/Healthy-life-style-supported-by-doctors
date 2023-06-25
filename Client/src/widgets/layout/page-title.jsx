import PropTypes from "prop-types";
import { Typography } from "@material-tailwind/react";

export function PageTitle({ heading, children }) {
  return (
    <div className="mx-auto w-full px-4 text-center lg:w-10/12">
      <Typography variant="h1" color="blue" className="mb-3 mb-3 underline font-bold">
        {heading}
      </Typography>
      <Typography variant="lead" className="text-blue-gray-500 text-left">
        {children}
      </Typography>
    </div>
  );
}
PageTitle.propTypes = {
  heading: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

PageTitle.displayName = "/src/widgets/layout/page-title.jsx";

export default PageTitle;
