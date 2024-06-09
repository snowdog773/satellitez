const About = () => {
  return (
    <>
      {" "}
      <div className="home-container">
        <div className="inner-container">
          <div className="about-content">
            <h2>About</h2>
            <p>
              Satellitez is a web application developed for sky watchers,
              astronomy enthusiasts, satNOGs operators, and all other common or
              garden space nerds to access quick and easy information in real
              time about the location of all the man made objects in orbit
              currently being tracked by Norad. It also features a handy
              predictor to give details of all bright objects flying overhead
              that are likely to be visible to the naked eye for any position on
              Earth. This app is free to use, however if you are using this
              regularly please consider making a donation to my Patreon. As you
              might imagine, there is a considerable amount of data crunching
              going on behind the scenes with associated server costs. Your
              donation will help keep this project live and fund future
              development.
            </p>
            <h2>How To Use</h2>
            <h3>Live Satellite Tracking</h3>
            <p>
              Live satellite tracking can be done in two ways, either by
              searching for an individual object by name or Norad ID in the
              search field, or alternately by using the group view, which has a
              list of curated groups and category of satellites to choose from.
              NB some of these data sets can be quite large so there is rate
              limiting on the animation of these larger sets to avoid melting
              your laptops! If you do find yourself in a situation where your
              fans start spinning fast and/or the page starts being slow, simply
              close the broswer tab and reopen in a fresh tab. I would
              appreciate if you email me a bug report in these situations with
              your computer specs and a brief description of the error. This app
              is under constant review and you can help me identify and fix
              bugs.
            </p>
            <p>
              Once you have selected your satellite or group you can use the
              timing controls to advance time and view the predicted orbit of
              the object(s) in question. Postional data for all these objects
              comes from TLE data broadcast from the satellites and distributed
              by Norad. This data is updated about every two hours for every
              object in space, and due to the high predictability of orbiting
              objects, can be used to calculate future positions with a high
              level of accuracy. Because of this it is possible to use the timer
              to find object positions up to a few days into the future with
              good accuray from the most recent TLE datum.
            </p>
            <p>
              There is also a globe rotation control on the page which is a
              visual tool, allowing you to spin the glob and all objects in
              orbit. This allows you to match the globe rotation to the orbit of
              a satellite to allow you to monitor an object over a period of
              time without it going behind the Earth.
            </p>
            <p>
              When viewing a single satellite there is an option to view further
              information about that object by clicking on the Currently
              Displaying link. This brings up a panel with further information
              about the object and live telemetry. There is also a further
              information panel, though as this comes from a third party API
              which in turn sources this data from Wikipedia, this isn't always
              accurate and returns information on medieval crop rotation, or
              German techno metal bands. Again please forward any bug reports to
              my email.
            </p>
            <h3>Visible Overflight Predictor</h3>
            <p>
              The overflight predictor automatically detects the global position
              of the website user and provides a list of orbiting objects that
              are predicted to overfly the users position. There are filters
              that can be used to select categories of satellite that you would
              like to receive data for by using the 'select by group' button.
              You can also get overflight info for a single onject using the
              'search by name or NORAD id' text input.
            </p>
            <p>
              There is also an input to select how many hours into thr future
              you want to display overflights for. The default is 6 hours and I
              would urge caution when attempting to get predictions for more
              than 24 hours as the calculations that run in the background of
              your browser are very resource intensive. As you can imagine
              calculating the positions and predicted paths of thousands of
              satellites takes a lot of number crunching, so I have added a
              display of number of overflights found along with the time taken
              to calculate, to give an indication of how your system is coping
              with the strain.
            </p>
            <p>
              Lastly there is a Night Filter button, all this does is filter
              your list of results according to the ones that will be overflying
              between sunset and sunrise in your locality.
            </p>
            <h2>How This Utility Was Built</h2>
            <p>
              Most of the functionality of this site comes from sets of two line
              element (TLE) data which is sourced from an API managed by{" "}
              <a href="https://celestrak.org/" target="_blank">
                Celestrak
              </a>
              . TLE is a data format that has been around since spaceflight was
              in it's infancy and is still in use today, and is a string of
              about 30 characters that describes a satellite's current position,
              velocity and orbital characteristics, which allow for the
              calculation of accurate predicted orbits. Although Celestrak is a
              great resource, they don't allow calls to retrieve satellite data
              more than once per hour to preserve their own server costs, which
              required the building of a backend database to cache the raw
              satellite data and query for fresh data only when allowed.
            </p>
            <p>
              On the front end of this site, the raw data gets crunched into
              useful global position and altitude data using a superb package
              called{" "}
              <a
                href="https://github.com/shashwatak/satellite-js"
                target="_blank"
              >
                satellites.js
              </a>{" "}
              which handles converting TLE data into plottable cartesian
              coordinates. This package is based on{" "}
              <a href="https://pypi.org/project/sgp4/" target="_blank">
                Brandon Rhodes
              </a>{" "}
              famous Python library for calculating orbits, but repackaged for
              the Javascript environment. This package with a bit of adaptation
              also allows calculation of viewing angles for overflying objects
              for any position on Earth.
            </p>
            <p>
              The rotating Earth and orbiting objects graphic comes from a
              package called{" "}
              <a href="https://www.npmjs.com/package/globe.gl" target="_blank">
                Globe.gl
              </a>{" "}
              which provides a 3D model of Earth with various texture layers
              available based on Three.js. All the calculated satellite
              coordinates produced by satellites.js are passed into this package
              as a dataset where they can be examined, displayed and animated.
            </p>
            <p>
              For the overflights predictor, the graphs are generated using{" "}
              <a href="https://www.chartjs.org/" target="_blank">
                chart.js
              </a>{" "}
              a useful and popular Javascript package for easily creating
              engaging charts and graphs.
            </p>
            <p>
              The main techs used for this site on the backend were Express
              server and mySQL for managing the hourly cache of TLE data from
              the API. The front end was built in React using Redux for state
              management, and React Router for navigation. Also an honourable
              mention for some of the smaller packages used in this project -
              axios, joi, dotenv, date-fns, node-cron that all played their
              part.
            </p>
            <h2>Developer</h2>
            <p>
              This app was built and is being maintained by Jon Pitans, a
              software developer based in Wales, combining interests in space
              exploration with building high interaction rich web applications.
              Please take the time to look over some of my other projects in my
              portfolio, and feel free to link up on{" "}
              <a href="https://www.linkedin.com/in/jon-pitans/" target="_blank">
                LinkedIn
              </a>{" "}
              or{" "}
              <a href="https://github.com/snowdog773" target="_blank">
                Github
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      <div className="spacer-50px"></div>
    </>
  );
};

export default About;
