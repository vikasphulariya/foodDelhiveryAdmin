import { Platform, NativeModules } from 'react-native';
import RNFS from 'react-native-fs';
import DocumentPicker from 'react-native-document-picker';

const Emp = () => {
	initPdf();
};

async function initPdf() {
	const { RNProcessor: Processor, PSPDFKit } = NativeModules;
	try {
		const pickerResult = await DocumentPicker.pickSingle({
			presentationStyle:'fullScreen',
		});

		const configuration = {
			name: 'ImageToPDF',
			images: [
				{
					imageUri: pickerResult.uri,
					position: 'center',
					width: 1920, // Document width.
					height: 1080, // Document height.
				},
			],
			override: true, // `true|false` — If `true`, it will override the existing file with the same name.
		};

		const { fileURL } = await Processor.generatePDFFromImages(
			configuration,
		);

		if (Platform.OS === 'android') {
			PSPDFKit.present(fileURL, {
				title: 'Generate PDF from images',
			});
			return;
		}

		await extractAsset(fileURL, 'sample.pdf', (mainpath) => {
			PSPDFKit.present(mainpath, {
				title: 'Generate a PDF from Images',
			});
		});
	} catch (e) {
		console.log(e.message, e.code);
		alert(e.message);
	}
}

const extractAsset = async (fileURL, fileName, callBack) => {
	try {
		await RNFS.readFile(fileURL, 'base64').then((document) => {
			let mainPath = `${RNFS.MainBundlePath}/${documentName(
				fileName,
			)}`;
			RNFS.writeFile(mainPath, document, 'base64')
				.then((success) => {
					callBack(mainPath);
				})
				.catch((e) => console.log(e));
		});
	} catch (error) {
		console.log('Error copying file', error);
	}
};

const documentName = (fileName) => {
	if (
		fileName.toLowerCase().substring(fileName.length - 4) !== '.pdf'
	) {
		return `${fileName}.pdf`;
	}
	return fileName;
};

export default Emp;