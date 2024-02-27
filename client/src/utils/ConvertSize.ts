
export function convertDiskSize(size: number): string {
	if (size <= 1000) {
		let sizeInBytes = size.toFixed(1) + " bytes";
		return sizeInBytes;
	} else if (size >= 1000 && size < 1.0e6) {
		let sizeInKb = size / 1000;
		let sizeInKbRounded = sizeInKb.toFixed(1) + " kB";
		return sizeInKbRounded;
	} else if (size >= 1.0e6 && size < 1.0e9) {
		let sizeInMb = size / 1.0e6;
		let sizeInMbRounded = sizeInMb.toFixed(1) + " MB";
		return sizeInMbRounded;
	} else {
		let sizeInGb = size / 1.0e9;
		let sizeInGbRounded = sizeInGb.toFixed(1) + " GB";
		return sizeInGbRounded;
	}
}