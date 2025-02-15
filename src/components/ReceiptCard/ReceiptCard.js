import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import Images from "../../../assets/images";
import TextWrapper from "../TextWrapper/TextWrapper";
import { showError, showSuccess } from "../../utils/MessageHandlers";
import { getUserById } from "../../services/queries";
import { AppColors, formateDate } from "../../utils/Global";
import { FlatList } from "react-native-actions-sheet";
import ReceiptItem from "../ReceiptItem/ReceiptItem";
import CustomButton from "../CustomButton/CustomButton";
import { finalizeItems, payFirst, payMyShare } from "../../services/mutations";
import { useSelector } from "react-redux";
import { AppIcons } from "../../libs";
import { moderateScale } from "react-native-size-matters";

const ReceiptCard = ({ receiptData, chatId, totalMembers }) => {
  const currentUser = useSelector((state) => state?.persistSlice?.user);
  const userId = currentUser?.uid;

  const [createdBy, setCreatedBy] = useState(null);
  const [paidByUser, setPaidByUser] = useState(null);
  const [checkedItems, setCheckedItems] = useState([]);
  const [isOrderFinalized, setIsOrderFinalized] = useState(false);
  const [receiptFinalized, setReceiptFinalized] = useState(false);
  const [hadPaidFirst, setHadPaidFirst] = useState(false);
  const [myShare, setMyShare] = useState(null);
  const [duesPaid, setDuesPaid] = useState(false);

  console.log(JSON.stringify(receiptData, null, 1));

  useEffect(() => {
    if (receiptData) {
      getPaidAndCreatedByUser();
      checkIfOrderFinalized();
      checkIfReceiptFinalized();
    }
  }, [receiptData, handleFinalize, handlePayFirst]);

  const getPaidAndCreatedByUser = async () => {
    try {
      if (receiptData?.paidBy) {
        const paidBy = await getUserById(receiptData?.paidBy);
        setPaidByUser(paidBy);
        if (paidBy.userId === userId) {
          setHadPaidFirst(true);
        }
      }
      const createdBy = await getUserById(receiptData?.createdby);
      setCreatedBy(createdBy);
    } catch (error) {
      showError("Error occured while getting user who paid the bill.");
    }
  };

  const checkIfOrderFinalized = () => {
    const userItems = receiptData?.userItems;
    if (userItems) {
      userItems.forEach((user) => {
        if (user.userId === userId) {
          setIsOrderFinalized(true); //TODO: MAKE IT TRUE
          setCheckedItems(user?.orderedItems);
          setMyShare(user?.myShare);
          setDuesPaid(user?.paid);
          return;
        }
      });
    }
  };

  const checkIfReceiptFinalized = () => {
    if (receiptData?.userItems?.length === totalMembers) {
      setReceiptFinalized(true);
    }
  };

  const handleFinalize = async () => {
    try {
      // const finalItems = checkedItems.length > 0 ? checkedItems : [];
      const response  = await finalizeItems(chatId, receiptData?.id, checkedItems);
      showSuccess(response.message);

    } catch (error) {
      showError("Failed to pay. ".concat(error.message));
    }
  };

  // Callback function to update checked items
  const handleItemCheck = (item, isChecked) => {
    if (isChecked) {
      // Add the item to the checkedItems array
      setCheckedItems((prev) => [...prev, item]);
    } else {
      // Remove the item from the checkedItems array
      setCheckedItems((prev) =>
        prev.filter((i) => i.itemName !== item.itemName)
      );
    }
  };

  const handlePayFirst = async () => {
    try {
      const response = await payFirst(chatId, receiptData?.id);
      showSuccess(response.message);

    } catch (error) {
      showError("Failed to pay. ".concat(error.message));
    }
  };

  const handlePayShare = async () => {
    try {
      const response = await payMyShare(chatId, receiptData?.id);
      showSuccess(response.message);
    } catch (error) {
      showError("Error paying your share: ".concat(error?.message));
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.dpFlex}>
        <View style={styles.dpContainer}>
          <Image
            source={Images.GoogleIcon}
            resizeMode="contain"
            style={styles.dp}
          />
        </View>
      </View>

      <View style={styles.receiptCtn}>
        <TextWrapper title={"ID:"} desc={receiptData?.id} />
        <TextWrapper
          title={"Date: "}
          desc={formateDate(receiptData?.createdAt, "withTime")}
        />
        <TextWrapper
          title={"Total Bill:"}
          desc={`$ ${receiptData?.totalBill}`}
        />
        <TextWrapper title={"Created By:"} desc={createdBy?.userName} />
        <TextWrapper title={"Paid By:"} desc={paidByUser?.userName || "None"} />
        <FlatList
          data={receiptData?.items}
          renderItem={({ item, index }) => {
            let manualCheck = false;
            checkedItems.forEach((temp) => {
              if (temp.itemName === item.itemName) {
                manualCheck = true;
              }
            });
            return (
              <ReceiptItem
                key={index}
                item={item}
                onCheck={handleItemCheck}
                isDisbled={isOrderFinalized}
                manualCheck={manualCheck}
              />
            );
          }}
        />
        {myShare > -1 && (
          <TextWrapper
            title={"Your share:"}
            desc={`$ ${myShare}`}
            priority={1.2}
          />
        )}

        {(receiptData?.paidBy && !isOrderFinalized) && (
          <CustomButton label={"Finalize"} onPress={handleFinalize} />
        )}

        {/* Pay first if no one has paid */}
        {(!receiptData?.paidBy || receiptData?.paidBy === null) && (
          <CustomButton
            label={"Pay First"}
            containerStyles={styles.btn}
            labelStyles={styles.btnTxt}
            onPress={handlePayFirst}
          />
        )}

        {receiptData?.paidBy &&
          receiptFinalized &&
          !hadPaidFirst &&
          !duesPaid && (
            <CustomButton
              label={`Pay Your Share to '${paidByUser?.userName}'`}
              containerStyles={styles.btn}
              labelStyles={styles.btnTxt}
              onPress={handlePayShare}
            />
          )}

        {(duesPaid || hadPaidFirst) && (
          <View style={styles.status}>
            <AppIcons.PaidIcon
              size={moderateScale(25)}
              color={AppColors.Primary}
              disabled
            />
            <Text style={styles.label}>Paid</Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default ReceiptCard;
