import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Octicons from 'react-native-vector-icons/Octicons';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Theme from './Theme.json';

const createIcon =
  (iconComponent, iconName) =>
    ({ onPress, size, color, disabled, style }) =>
    (
      <TouchableOpacity style={[styles(size).wrapper, style]} onPress={onPress} disabled={disabled}>
        {React.createElement(iconComponent, {
          name: iconName,
          color: color || Theme.colors.iconColor,
          size,
        })}
      </TouchableOpacity>
    );

const AppIcons = {
  FrownoIcon: createIcon(AntDesign, 'frowno'),
  SearchIcon: createIcon(EvilIcons, 'search'),
  MenuIcon: createIcon(MaterialCommunityIcons, 'menu'),
  EmailIcon: createIcon(MaterialCommunityIcons, 'email-outline'),
  BackIcon: createIcon(AntDesign, 'left'),
  BackIcon1: createIcon(Entypo, 'chevron-left'),
  ForwardIcon: createIcon(AntDesign, 'right'),
  CardsHeartIcon: createIcon(MaterialCommunityIcons, 'cards-heart'),
  HeartIcon: createIcon(MaterialCommunityIcons, 'heart-multiple-outline'),
  HomeIcon: createIcon(MaterialCommunityIcons, 'home-outline'),
  ShoppingIcon: createIcon(MaterialCommunityIcons, 'shopping-outline'),
  LoginIcon: createIcon(MaterialCommunityIcons, 'login'),
  ErrorIcon: createIcon(MaterialIcons, 'error-outline'),
  DeleteIcon: createIcon(MaterialIcons, 'delete'),
  EyeIcon: createIcon(MaterialCommunityIcons, 'eye-outline'),
  EyeOffIcon: createIcon(MaterialCommunityIcons, 'eye-off-outline'),
  CloseIcon: createIcon(AntDesign, 'close'),
  Checkcircleo: createIcon(AntDesign, 'checkcircleo'),
  Checkcircle: createIcon(AntDesign, 'checkcircle'),
  Exclamationcircleo: createIcon(AntDesign, 'exclamationcircleo'),
  Document: createIcon(Ionicons, 'document-text-outline'),
  Shield: createIcon(Ionicons, 'shield-checkmark-outline'),
  Photograph: createIcon(Fontisto, 'photograph'),
  Chat: createIcon(Ionicons, 'chatbox-ellipses-outline'),
  Template: createIcon(Octicons, 'repo-template'),
  Idcard: createIcon(AntDesign, 'idcard'),
  Language: createIcon(MaterialIcons, 'language'),
  Notifications: createIcon(MaterialCommunityIcons, 'bell'),
  Preferences: createIcon(AntDesign, 'filter'),
  BlockedMembers: createIcon(Entypo, 'block'),
  AccountSettings: createIcon(AntDesign, 'user'),
  Feedback: createIcon(FontAwesome, 'pencil-square-o'),
  Check: createIcon(MaterialCommunityIcons, 'checkbox-marked'),
  UnCheck: createIcon(MaterialCommunityIcons, 'checkbox-blank-outline'),
  DropDown: createIcon(AntDesign, 'down'),
  RadioBtn: createIcon(Ionicons, 'radio-button-off-sharp'),
  RadioBtnCheck: createIcon(Ionicons, 'radio-button-on'),
  RightCircle: createIcon(AntDesign, 'rightcircleo'),
  Addfile: createIcon(AntDesign, 'addfile'),
  ShareIcon: createIcon(AntDesign, 'sharealt'), // Make sure ShareIcon is defined
  GlassIcon: createIcon(Entypo, 'magnifying-glass'),
  HomeIcon: createIcon(FontAwesome, 'home'),
  UserIcon: createIcon(FontAwesome5, 'user-alt'),
  FileIcon: createIcon(MaterialCommunityIcons, 'file'),
  RocketIcon: createIcon(Ionicons, 'rocket-sharp'),
  CameraIcon: createIcon(MaterialIcons, 'camera-alt'),
  ChevronUpIcon: createIcon(FontAwesome6, 'chevron-up'),
  ChevronDownIcon: createIcon(FontAwesome6, 'chevron-down'),
  ChevronRightIcon: createIcon(FontAwesome6, 'chevron-right'),
};

export default AppIcons;  

const styles = width =>
  StyleSheet.create({
    wrapper: {
      width: width + 4,
      padding: 2,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
