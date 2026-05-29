import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';

export default function Cadastro({ navigation }) {
  const [tipoUsuario, setTipoUsuario] = useState(null); // 'autista' ou 'especialista'

  // Estados dos Campos
  const [nome, setNome] = useState('');
  const [nickname, setNickname] = useState('');
  const [ciptea, setCiptea] = useState('');
  const [dataNasc, setDataNasc] = useState('');
  const [registro, setRegistro] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCadastro = () => {
    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem!');
      return;
    }
    
    // Aqui depois faremos o FETCH para salvar no MySQL
    Alert.alert('Sucesso', 'Cadastro realizado com sucesso (Simulado)!');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Pinguinismo 🐧</Text>
      <Text style={styles.subtitulo}>Selecione o tipo de perfil para começar</Text>

      {/* Botões de Seleção de Perfil */}
      <View style={styles.row}>
        <TouchableOpacity 
          style={[styles.btnSeletor, tipoUsuario === 'autista' && styles.btnAtivo]}
          onPress={() => setTipoUsuario('autista')}
        >
          <Text style={[styles.txtSeletor, tipoUsuario === 'autista' && styles.txtAtivo]}>Autista / Família</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.btnSeletor, tipoUsuario === 'especialista' && styles.btnAtivo]}
          onPress={() => setTipoUsuario('especialista')}
        >
          <Text style={[styles.txtSeletor, tipoUsuario === 'especialista' && styles.txtAtivo]}>Especialista</Text>
        </TouchableOpacity>
      </View>

      {/* Formulário Dinâmico */}
      {tipoUsuario && (
        <View style={styles.form}>
          <Text style={styles.label}>Nome Completo</Text>
          <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholder="Digite seu nome" />

          {tipoUsuario === 'autista' ? (
            <>
              <Text style={styles.label}>Nome de Usuário (Nickname)</Text>
              <TextInput style={styles.input} value={nickname} onChangeText={setNickname} placeholder="Ex: usua_gigi" />

              <Text style={styles.label}>Número da CIPTEA</Text>
              <TextInput style={styles.input} value={ciptea} onChangeText={setCiptea} placeholder="00000/0000" />

              <Text style={styles.label}>Data de Nascimento</Text>
              <TextInput style={styles.input} value={dataNasc} onChangeText={setDataNasc} placeholder="DD/MM/AAAA" />
            </>
          ) : (
            <>
              <Text style={styles.label}>Registro Profissional (CRM/CRP)</Text>
              <TextInput style={styles.input} value={registro} onChangeText={setRegistro} placeholder="Digite seu registro" />

              <Text style={styles.label}>Especialidade</Text>
              <TextInput style={styles.input} value={especialidade} onChangeText={setEspecialidade} placeholder="Ex: Psicólogo, Terapeuta" />
            </>
          )}

          <Text style={styles.label}>Senha de Acesso</Text>
          <TextInput style={styles.input} secureTextEntry value={senha} onChangeText={setSenha} placeholder="******" />

          <Text style={styles.label}>Confirmar Senha</Text>
          <TextInput style={styles.input} secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} placeholder="******" />

          <TouchableOpacity style={styles.btnFinalizar} onPress={handleCadastro}>
            <Text style={styles.txtFinalizar}>Finalizar Cadastro</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#F4F7FC', alignItems: 'center', paddingTop: 60 },
  titulo: { fontSize: 28, fontWeight: 'bold', color: '#1A365D', marginBottom: 5 },
  subtitulo: { fontSize: 14, color: '#627D98', marginBottom: 25, textAlign: 'center' },
  row: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginBottom: 20 },
  btnSeletor: { flex: 1, padding: 15, backgroundColor: '#E4EBF4', marginHorizontal: 5, borderRadius: 10, alignItems: 'center' },
  btnAtivo: { backgroundColor: '#1E3A8A' },
  txtSeletor: { color: '#486581', fontWeight: 'bold' },
  txtAtivo: { color: '#FFF' },
  form: { width: '100%', backgroundColor: '#FFF', padding: 20, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5, elevation: 3 },
  label: { fontSize: 14, color: '#334E68', fontWeight: '600', marginBottom: 5, marginTop: 10 },
  input: { width: '100%', height: 45, borderColor: '#CBD5E1', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, backgroundColor: '#F8FAFC' },
  btnFinalizar: { backgroundColor: '#10B981', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 25 },
  txtFinalizar: { color: '#FFF', fontWeight: 'bold', fontSize: 16 }
});