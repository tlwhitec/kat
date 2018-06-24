// https://hackernoon.com/nightmarishly-good-scraping-with-nightmare-js-and-async-await-b7b20a38438f
const Nightmare = require('nightmare');

//const START = 'http://nahlizenidokn.cuzk.cz/VyberBudovu.aspx?typ=Stavba';
const START = 'https://eservices.landregistry.gov.uk/wps/portal/Property_Search';
//console.dir("abc");

const getAddress = async id => {
  console.log(`Now checking ${id}`);
  const nightmare = new Nightmare({ show: true });
// Go to initial start page, navigate to Detail search
  try {
    await nightmare
      .goto(START)
      .wait('.bodylinkcopy:first-child')
      .click('.bodylinkcopy:first-child');
  } catch(e) {
    console.error(e);
  }

  // Type the title number into the appropriate box; click submit
  try {
    await nightmare
      .wait('input[name="titleNo"]')
      .type('input[name="titleNo"]', id)
      .click('input[value="Search »"]');
  } catch(e) {
    console.error(e);
  }

  try {
    const result = await nightmare
      .wait('.w80p')
      .evaluate(() => {
        return [...document.querySelectorAll('.w80p')]
          .map(el => el.innerText);
      })
      .end();
    return { id, address: result[0], lease: result[1] };
  } catch(e) {
    console.error(e);
    return undefined;
  }
}

getAddress('HP431696')
  .then(a => console.dir(a))
  .catch(e => console.error(e));
