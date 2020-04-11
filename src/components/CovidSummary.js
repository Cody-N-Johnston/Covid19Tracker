import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import styles from '../Style.js';

class Summary extends Component {
    constructor() {
        super();
        this.state = {
            data: null,
            summaryData: null,
            loaded: false,
            error: null,
        }
    }

    baseUrl = 'https://api.covid19api.com';

    getData = (event) => {
        this.setState({loaded: false})
        let url = this.baseUrl + '/summary';
        let headers = new Headers();
        let request = new Request(url, {
            headers: headers,
            method: 'GET'
        });

        fetch(request)
            .then(response => response.json())
            .then(this.parseData)
            .catch(this.handleError)
    }

   parseData = (data) => {
        this.setState({data: data});
        this.setState({summaryData: data.Global});
        this.setState({loaded: true});
   }

   updateData = () => {
        this.setState({loaded: false});
        this.getData();
   }

   handleError = (err) => {
        this.setState({error: err.message});
   }

   hasError = () => {
        return this.state.error === null;
   }

   isDataLoaded = () => {
        return !this.state.loaded;
   }

   componentDidMount = () => {
        this.state.data !== null ? this.setState({loaded: true}) : this.getData();
   }

   onPress = () => {
        this.updateData()
   }

    render() {
       return(
           <View style={styles.container}>
               <View style={summaryStyles.mainContent}>
                   <ActivityIndicator size="large" color="#A3BE8C" animating={this.isDataLoaded()}/>
                   {this.hasError() === false && (
                       <Text style={summaryStyles.error} >{this.state.error}</Text>
                   )}

                   {this.state.summaryData && (
                      <ScrollView>
                          <Text style={[summaryStyles.header, styles.lightText]}>
                             New Confirmed Cases:
                          </Text>
                          <Text style={[styles.lightText, summaryStyles.item]}>
                              {this.state.summaryData["NewConfirmed"]}
                          </Text>
                          <Text style={[summaryStyles.header, styles.lightText]}>
                              Total Confirmed Cases:
                          </Text>
                          <Text style={[styles.lightText, summaryStyles.item]}>
                              {this.state.summaryData["TotalConfirmed"]}
                          </Text>
                          <Text style={[summaryStyles.header, styles.lightText]}>
                              New Deaths:
                          </Text>
                          <Text style={[styles.lightText, summaryStyles.item]}>
                              {this.state.summaryData["NewDeaths"]}
                          </Text>
                          <Text style={[summaryStyles.header, styles.lightText]}>
                              Total Deaths:
                          </Text>
                          <Text style={[styles.lightText, summaryStyles.item]}>
                              {this.state.summaryData["TotalDeaths"]}
                          </Text>
                          <Text style={[summaryStyles.header, styles.lightText]}>
                              New Recoveries:
                          </Text>
                          <Text style={[styles.lightText, summaryStyles.item]}>
                              {this.state.summaryData["NewRecovered"]}
                          </Text>
                          <Text style={[summaryStyles.header, styles.lightText]}>
                              Total Recoveries:
                          </Text>
                          <Text style={[styles.lightText, summaryStyles.item]}>
                              {this.state.summaryData["TotalRecovered"]}
                          </Text>
                      </ScrollView>
                   )}
                   <View style={summaryStyles.footer}>
                       <TouchableOpacity
                           style={[styles.buttonContainer, styles.roundButton, summaryStyles.button]}
                           onPress={this.onPress}
                       >
                           <Text style={styles.buttonText}>Update Data</Text>
                       </TouchableOpacity>
                   </View>
               </View>
           </View>
       );
    }
}

export default Summary;

const summaryStyles = StyleSheet.create({
    mainContent: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'center'
    },
    item: {
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        width: 150,
        borderColor: '#2E3440'
    },
    footer: {
        position: 'absolute',
        bottom: 0
    },
    error: {
        fontSize: 30,
        fontWeight: '700',
        color: '#BF616A'
    },
    header: {
        fontSize: 30,
        fontWeight: '700',
        alignItems: 'center',
        justifyContent: 'center'
    }
});