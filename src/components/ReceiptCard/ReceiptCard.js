import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./Styles";
import Images from "../../../assets/images";
import TextWrapper from "../TextWrapper/TextWrapper";
import { showError } from "../../utils/MessageHandlers";
import { getUserById } from "../../services/queries";
import { formateDate } from "../../utils/Global";
import { FlatList } from "react-native-actions-sheet";
import ReceiptItem from "../ReceiptItem/ReceiptItem";
import CustomButton from "../CustomButton/CustomButton";
import { finalizeItems, payFirst, payMyShare } from "../../services/mutations";
import { useSelector } from "react-redux";

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
        if(paidBy.userId === userId){
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
          setCheckedItems(user?.orderedItems)
          setMyShare(user?.myShare);
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

  const handleFinalize = async () => {2
    try {
      await finalizeItems(chatId, receiptData?.id, checkedItems);
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
      await payFirst(chatId, receiptData?.id);
    } catch (error) {
      showError("Failed to pay. ".concat(error.message));
    }
  };

  const handlePayShare = async()=> {
    try{
      await payMyShare(chatId, receiptData?.id)
    }catch(error){
      showError('Error paying your share: '.concat(error?.message));
    }
  }

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
            checkedItems.forEach((temp)=>{
                if(temp.itemName === item.itemName){
                    manualCheck=true;
                }
            })
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
        {myShare && <TextWrapper title={"Your share:"} desc={`$ ${myShare}`} priority={1.2}/>}

        {(
          !isOrderFinalized) && (
            <CustomButton label={"Finalize"} onPress={handleFinalize} />
          )}

        {/* Pay first if no one has paid */}
        {(!receiptData?.paidBy || receiptData?.paidBy === null) &&(
          <CustomButton
            label={"Pay First"}
            containerStyles={styles.btn}
            labelStyles={styles.btnTxt}
            onPress={handlePayFirst}
          />
        )}

        {receiptData?.paidBy && receiptFinalized && !hadPaidFirst && (
          <CustomButton
            label={`Pay Your Share to '${paidByUser?.userName}'`}
            containerStyles={styles.btn}
            labelStyles={styles.btnTxt}
            onPress={handlePayShare}
          />
        )}
      </View>
    </View>
  );
};

export default ReceiptCard;
