import axios from "axios";
import cheerio from "cheerio";
import _ from "lodash";

// Spring only seems to like placing the csrf token directly in the HTML...
// that's OK though, we can just extract it when needed.
// todo don't make this so dumb
export async function getCSRFToken() {
    let res = await axios.get("http://localhost:8080/login");
    console.log(res);
    let html = res.data;
    const $ = cheerio.load(html);
    let token = _.find(Object.values($('input')), (o) => {
        return o.attribs.name === "_csrf"
    }).attribs.value;
    console.log(token);

    return token;
}
