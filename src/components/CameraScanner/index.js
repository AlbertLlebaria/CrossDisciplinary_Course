import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Button } from 'react-native-paper'
import { BarCodeScanner } from 'expo-barcode-scanner';
import { handleFormChange } from '../../actions/store.actions'
import { connect } from 'react-redux';


class BarcodeScannerExample extends React.Component {
    state = {
        hasCameraPermission: null,
        scanned: false,
        code: 0
    };

    async componentDidMount() {
        this.getPermissionsAsync();
    }

    getPermissionsAsync = async () => {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({ hasCameraPermission: status === 'granted' });
    };

    render() {
        const { hasCameraPermission, scanned } = this.state;

        if (hasCameraPermission === null) {
            return <Text>Requesting for camera permission</Text>;
        }
        if (hasCameraPermission === false) {
            return <Text>No access to camera</Text>;
        }
        return (
            <View
                style={{
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                }}>
                <BarCodeScanner
                    onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
                    style={StyleSheet.absoluteFillObject}
                />
                <View style={{
                    width: '100%',
                    height: "15%",
                    bottom: 0,
                    backgroundColor: '#000000',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    {scanned && (
                        <Button onPress={() => { 
                            this.props.handleFormChange('barcode',null)
                            this.setState({ scanned: false })
                             }} >
                            Tap to Scan Again
                        </Button>
                    )}
                    <Button
                        style={{
                            width: '100%',
                            backgroundColor: '#C4D6B0'
                        }}
                        color="#FFFFFF"
                        raised
                        onPress={() => { this.props.navigation.navigate('Form') }}>
                        Tilbage
                    </Button>
                </View>
            </View>
        );
    }

    handleBarCodeScanned = ({ type, data }) => {
        this.setState({ scanned: true, code: data });
        this.props.handleFormChange('barcode', data)
        alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    };
}

const mapDispatchToProps = {
    handleFormChange
}

export default connect(null, mapDispatchToProps)(BarcodeScannerExample);