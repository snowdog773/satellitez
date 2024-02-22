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
            <p>Yet to be built so there</p>
            <h2>Developer</h2>
            <p>
              This app was built and is being maintained by Jon Pitans, a
              software developer based in Wales, combining interests in space
              exploration with building high interaction rich web applications.
              Please take the time to look over some of my other projects in my
              portfolio, and feel free to link up on LinkedIn or Github.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
