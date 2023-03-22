import { StyleSheet, Text, TextInput, View, Button, FlatListProps } from "react-native";
import React, { useState } from "react";
import {app} from '../firebase/firebase';
import { getFirestore, doc, setDoc, updateDoc}from './firebase/firebase';