import { Alert, Button, Text, TextInput } from "react-native";
import styles from "./styles";
import { useEffect, useState } from "react";
import { userService } from "../../../service/user.service";
import { NavigationProp, useNavigation, useRoute } from "@react-navigation/native";
import { User } from "../../../models/user";

export default function UserDetails(){

    const navigation = useNavigation<NavigationProp<any>>();

    const route = useRoute();

    const { userId } = route.params as any;

    const [nome, setNome] = useState("");
    const [login, setLogin] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirmacao, setSenhaConfimacao] = useState("");

    useEffect(() =>{
        userService.get(userId).then(userFromDataBase => {
            setNome(userFromDataBase?.name!);
            setLogin(userFromDataBase?.username!);
        })
    }, [])
    

    function salvarModificacoes(){

        if(senha !== senhaConfirmacao){
            Alert.alert("Senhas não são iguais");
            return;
        }

        userService.update(
            userId,
            nome,
            login,
            senha
        ).then((resultado) => {

            if(resultado){
                navigation.navigate("UsersPage");
            }else{
                Alert.alert("Erro");
            }

        });

        
    }

    return(
        <>
            <TextInput 
                style={styles.inputText}
                placeholder="Nome"
                value={nome}
                onChangeText={setNome}
            />
            <TextInput
                style={styles.inputText}
                placeholder="Login"
                value={login}
                onChangeText={setLogin}
            />
            <TextInput
                style={styles.inputText}
                placeholder="Senha"
                value={senha}
                onChangeText={setSenha}
            />
            <TextInput
                style={styles.inputText}
                placeholder="Confirmar Senha"
                value={senhaConfirmacao}
                onChangeText={setSenhaConfimacao}
            />
            <Button 
                title="Salvar"
                onPress={salvarModificacoes}
            />
        </>
    )

}