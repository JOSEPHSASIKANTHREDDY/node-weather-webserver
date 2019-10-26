const path = require("path"),
  express = require("express"),
  app = express(),
  hbs = require("hbs"),
  geocode = require("./utils/geocode.js").geocode,
  forecast = require("./utils/forecast.js").forecast,
  port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "../templates/views"));
hbs.registerPartials(path.join(__dirname, "../templates/partials"));

app.use(express.static(path.join(__dirname, "../public")));

app.get("/", (req, res) => {
  res.render("index", {
    name: "Joseph",
    surname: "Byreddy",
    createdBy: "Joseph Byreddy"
  });
});

app.get("/help", (req, res) => {
  // res.sendFile(path.join(__dirname, '../public/help.html'))
  res.render("help", {
    name: "Joseph",
    surname: "Byreddy",
    createdBy: "Joseph Byreddy"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    name: "Joseph",
    surname: "Byreddy",
    createdBy: "Joseph Byreddy"
  });
});
app.get("/weather-app", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please send an address"
    });
  }
  // @ts-ignore
  geocode(
    req.query.address,
    // @ts-ignore
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      // @ts-ignore
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({ location, forecastData });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("Error404", {
    error: "Help page not available"
  });
});

app.get("*", (req, res) => {
  res.render("Error404", {
    error: "Page Not Found 404"
  });
});

app.listen(port, () => console.log("Server Listening @3000"));
