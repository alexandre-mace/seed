export default function htmlDecode(input)
{
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
}

// This returns "<img src='myimage.jpg'>"
htmlDecode("&lt;img src='myimage.jpg'&gt;");

// This returns ""
htmlDecode("<img src='dummy' onerror='alert(/xss/)'>");