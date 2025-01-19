// NativeInput.js
import React, { useState } from "react";
import {
  View,
  Image,
  TextInput as TextInput1,
  TouchableOpacity,
} from "react-native";
import PropTypes from "prop-types";
import styles from "./NativeInputStyle";
import { TextInput } from "react-native-paper";
import ShowEye from "../ShowEye/ShowEye";
import { AppColors } from "../../utils/Global";
import { Theme } from "../../libs";

const NativeInput = ({
  onChangeText,
  placeholder,
  inputStyle,
  placeholderTextColor,
  value,
  keyboardType,
  autoFocus,
  ref,
  blurOnSubmit,
  dataDetectorTypes,
  editable,
  enterKeyHint,
  focusable,
  keyboardAppearance,
  maxLength,
  multiline,
  onBlur,
  onEndEditing,
  onFocus,
  onSubmitEditing,
  returnKeyType,
  secureTextEntry,
  textAlignVertical,
  errorText,
  imgIcon,
  containerStyle,
  smallInput,
  withOutIcon,
  plainTxtInp,
  label,
  isFocused,
  simpleTxtInp,
  withEyeIcon,
  autoCapitalize = "sentences",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {smallInput ? (
        <View style={[styles.inputSmContainer, containerStyle]}>
          <View style={styles.flexSmRow}>
            <View style={styles.imgSmLogo}>
              <Image-
                source={imgIcon}
                resizeMode="contain"
                style={styles.setWidthImg}
              />
            </View>
            <TextInput
              style={[
                styles.inputSm,
                inputStyle,
                { borderColor: errorText && AppColors.error },
              ]}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              value={value}
              keyboardType={keyboardType}
              autoFocus={autoFocus}
              ref={ref}
              blurOnSubmit={blurOnSubmit}
              dataDetectorTypes={dataDetectorTypes}
              editable={editable}
              enterKeyHint={enterKeyHint}
              focusable={focusable}
              keyboardAppearance={keyboardAppearance}
              maxLength={maxLength || 5000}
              multiline={multiline}
              onBlur={onBlur}
              onEndEditing={onEndEditing}
              onFocus={onFocus}
              onSubmitEditing={onSubmitEditing}
              returnKeyType={returnKeyType}
              secureTextEntry={secureTextEntry}
              textAlignVertical={textAlignVertical}
              autoCapitalize={autoCapitalize}
            />
          </View>
        </View>
      ) : withOutIcon ? (
        <View style={[styles.inputContainer, containerStyle]}>
          <TextInput
            style={[
              styles.input,
              inputStyle,
              { borderColor: errorText && AppColors.error },
            ]}
            mode="outlined"
            label={label}
            theme={{
              colors: {
                primary: AppColors.Primary,
                background: AppColors.white,
              },
            }}
            outlineColor={AppColors.MidGrey3}
            textColor={AppColors.black}
            activeOutlineColor={Theme.linear.lightBlue}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            keyboardType={keyboardType}
            autoFocus={autoFocus}
            ref={ref}
            blurOnSubmit={blurOnSubmit}
            dataDetectorTypes={dataDetectorTypes}
            editable={editable}
            enterKeyHint={enterKeyHint}
            focusable={focusable}
            keyboardAppearance={keyboardAppearance}
            maxLength={maxLength || 5000}
            multiline={multiline}
            onBlur={onBlur}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            textAlignVertical={textAlignVertical}
            autoCapitalize={autoCapitalize}
          />
        </View>
      ) : plainTxtInp ? (
        <View style={[styles.inputContainerPlain, containerStyle]}>
          <TextInput
            style={[
              styles.inputPlain,
              inputStyle,
              { borderColor: errorText && AppColors.error },
            ]}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            keyboardType={keyboardType}
            autoFocus={autoFocus}
            ref={ref}
            blurOnSubmit={blurOnSubmit}
            dataDetectorTypes={dataDetectorTypes}
            editable={editable}
            enterKeyHint={enterKeyHint}
            focusable={focusable}
            keyboardAppearance={keyboardAppearance}
            maxLength={maxLength || 5000}
            multiline={multiline}
            onBlur={onBlur}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            textAlignVertical={textAlignVertical}
            autoCapitalize={autoCapitalize}
          />
        </View>
      ) : simpleTxtInp ? (
        <View style={[styles.inputContainer, containerStyle]}>
          <TextInput1
            style={[
              styles.input,
              inputStyle,

              // {borderColor: errorText && AppColors.error},
            ]}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={placeholderTextColor}
            value={value}
            keyboardType={keyboardType}
            autoFocus={autoFocus}
            ref={ref}
            blurOnSubmit={blurOnSubmit}
            dataDetectorTypes={dataDetectorTypes}
            editable={editable}
            enterKeyHint={enterKeyHint}
            focusable={focusable}
            keyboardAppearance={keyboardAppearance}
            maxLength={maxLength || 5000}
            multiline={multiline}
            onBlur={onBlur}
            onEndEditing={onEndEditing}
            onFocus={onFocus}
            onSubmitEditing={onSubmitEditing}
            returnKeyType={returnKeyType}
            secureTextEntry={secureTextEntry}
            textAlignVertical={textAlignVertical}
            autoCapitalize={autoCapitalize}
          />
        </View>
      ) : withEyeIcon ? (
        <View style={[styles.inputContainer, containerStyle]}>
          <View
            style={{
              position: "relative",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <ShowEye
              show={showPassword}
              onPress={() => setShowPassword(!showPassword)}
              activeName={"eye-off"}
              notActiveName={"eye"}
            />

            <TextInput
              style={[
                styles.input,
                inputStyle,
                { borderColor: errorText && AppColors.error },
              ]}
              mode="outlined"
              label={label}
              theme={{
                colors: {
                  primary: AppColors.Primary,
                  background: AppColors.white,
                },
              }}
              outlineColor={AppColors.MidGrey3}
              textColor={AppColors.black}
              activeOutlineColor={Theme.linear.lightBlue}
              onChangeText={onChangeText}
              placeholder={placeholder}
              placeholderTextColor={placeholderTextColor}
              value={value}
              keyboardType={keyboardType}
              autoFocus={autoFocus}
              ref={ref}
              blurOnSubmit={blurOnSubmit}
              dataDetectorTypes={dataDetectorTypes}
              editable={editable}
              enterKeyHint={enterKeyHint}
              focusable={focusable}
              keyboardAppearance={keyboardAppearance}
              maxLength={maxLength || 5000}
              multiline={multiline}
              onBlur={onBlur}
              onEndEditing={onEndEditing}
              onFocus={onFocus}
              onSubmitEditing={onSubmitEditing}
              returnKeyType={returnKeyType}
              secureTextEntry={!showPassword}
              textAlignVertical={showPassword}
              autoCapitalize={autoCapitalize}
            />
          </View>
        </View>
      ) : null}
    </>
  );
};

NativeInput.propTypes = {
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  inputStyle: PropTypes.object,
  placeholderTextColor: PropTypes.string,
  value: PropTypes.string,
  keyboardType: PropTypes.string,
  autoFocus: PropTypes.bool,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  blurOnSubmit: PropTypes.bool,
  dataDetectorTypes: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  editable: PropTypes.bool,
  enterKeyHint: PropTypes.string,
  focusable: PropTypes.bool,
  keyboardAppearance: PropTypes.string,
  maxLength: PropTypes.number,
  multiline: PropTypes.bool,
  onBlur: PropTypes.func,
  onEndEditing: PropTypes.func,
  onFocus: PropTypes.func,
  onSubmitEditing: PropTypes.func,
  returnKeyType: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  textAlignVertical: PropTypes.string,
  errorText: PropTypes.string,
};

// Define default values
NativeInput.defaultProps = {
  placeholder: "",
  inputStyle: {},
  placeholderTextColor: "gray",
  value: "",
  keyboardType: "default",
  autoFocus: false,
  ref: null,
  blurOnSubmit: true,
  dataDetectorTypes: "none",
  editable: true,
  enterKeyHint: "done",
  focusable: true,
  keyboardAppearance: "default",
  maxLength: 5000,
  multiline: false,
  onBlur: () => {},
  onEndEditing: () => {},
  onFocus: () => {},
  onSubmitEditing: () => {},
  returnKeyType: "done",
  secureTextEntry: false,
  textAlignVertical: "auto",
  errorText: null,
};

export default NativeInput;
