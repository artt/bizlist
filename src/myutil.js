export function trimURL(fullurl) {
	const tmp = fullurl.trim().match(/(\/\/www.|www\.|\/\/)([^\/]+)/);
	if (tmp === null) {
		return fullurl.trim();
	}
	return tmp[2];
}

export function trimPhone(phonetext) {
	const tmp = phonetext.trim().match(/(\d{4}|\d-\d{4}-\d{4}|\d{3}-\d{3}-\d{4}|\d{3}-\d{3}-\d{3})/);
	
	return tmp[0];
}

export function trimFacebook(fburl) {
	const tmp = fburl.trim().match(/facebook.com\/([^\/]+)\/?/);
	if (tmp === null) {
		return fburl.trim();
	}
	return tmp[1];
}