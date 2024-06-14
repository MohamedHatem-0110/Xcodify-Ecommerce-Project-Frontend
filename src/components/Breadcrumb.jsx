import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useBreadcrumb } from "../providers/breadcrumbProvider";

function Breadcrumb() {
  const { breadcrumbs } = useBreadcrumb();
  const location = useLocation();
  let pathIncrement = "";

  // Split the pathname to get each part of the path
  let paths = location.pathname.split("/").filter((path) => path !== "");
  // Create breadcrumbs array by combining default route and custom updates
  if (paths.includes("search")) {
    paths = ["search"];
  }

  var mergedBreadcrumbs = breadcrumbs.length
    ? [...paths.slice(0, paths.length - 1), breadcrumbs]
    : paths;

  if (mergedBreadcrumbs[length - 2] == "products")
    mergedBreadcrumbs = mergedBreadcrumbs.slice(
      0,
      mergedBreadcrumbs.length - 1
    );

  return (
    paths.length > 0 && (
      <div className="w-100% mt-14 p-2 bg-gray-200">
        <Link to={"/"} className="uppercase">
          HOME {" > "}
        </Link>

        {mergedBreadcrumbs.map((path, index) => {
          index === 0 ? (pathIncrement += path) : (pathIncrement += "/" + path);
          console.log(pathIncrement);
          return (
            <React.Fragment key={index}>
              {path !== "/" &&
                (index !== mergedBreadcrumbs.length - 1 ? (
                  <Link
                    id={pathIncrement}
                    to={`/${pathIncrement}`}
                    className="uppercase"
                  >
                    {path}
                  </Link>
                ) : (
                  <span className="uppercase">{path}</span>
                ))}
              {index < mergedBreadcrumbs.length - 1 && " > "}
            </React.Fragment>
          );
        })}
      </div>
    )
  );
}

export default Breadcrumb;
