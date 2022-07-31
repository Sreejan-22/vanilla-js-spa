const navigateTo = (url) => {
  history.pushState(null, null, url);
  router();
};

const router = async () => {
  // whenever the user goes to any of these "path"s the corresponding "view" function will get called
  const routes = [
    {
      path: "/",
      view: () => console.log("Viewing Dashboard"),
    },
    {
      path: "/posts",
      view: () => console.log("Viewing Posts"),
    },
    {
      path: "/settings",
      view: () => console.log("Viewing Settings"),
    },
  ];

  // Test each route for potential match
  const potentialMatches = routes.map((route) => {
    return {
      route: route,
      isMatch: location.pathname === route.path,
    };
  });

  let match = potentialMatches.find((item) => item.isMatch);

  // 404 route
  if (!match) {
    match = {
      route: {
        path: location.pathname,
        view: () => console.log("404 route"),
      },
      isMatch: true,
    };
  }

  match.route.view();
};

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", (e) => {
  document.addEventListener("click", (e) => {
    if (e.target.matches("[data-link]")) {
      e.preventDefault();
      navigateTo(e.target.href);
    }
  });

  router();
});
