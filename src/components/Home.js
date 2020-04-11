import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import styles from '../Style.js';
import Summary from './CovidSummary.js';

class HomeScreen extends Component {
    render() {
        return (
            <View style={styles.container}>
               <Summary />
            </View>
        )
    }
}

export default HomeScreen;
