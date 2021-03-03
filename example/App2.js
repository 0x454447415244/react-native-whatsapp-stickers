import React, { useEffect, useState } from 'react'
import { Alert, Button, Platform, Text, View } from 'react-native'
import RNWhatsAppStickers from 'react-native-whatsapp-stickers'

this.config = {
  identifier: 'sample1',
  name: 'WA Stickers',
  publisher: 'Edgard Chammas',
  trayImageFileName: 'https://rnnlab.com/images/tray.png',
  publisherEmail: 'root@rnnlab.com',
  publisherWebsite: 'https://github.com/0x454447415244/react-native-whatsapp-stickers',
  privacyPolicyWebsite: 'https://github.com/0x454447415244/react-native-whatsapp-stickers',
  licenseAgreementWebsite: 'https://github.com/0x454447415244/react-native-whatsapp-stickers/blob/master/LICENSE',
  stickers: [
    { fileName: 'https://rnnlab.com/images/a.png', emojis: [] },
    { fileName: 'https://rnnlab.com/images/b.png', emojis: [] },
    { fileName: 'https://rnnlab.com/images/c.png', emojis: [] },
  ]
}

const { stickers, ...packConfig } = config

const logError = e => {
  console.log(e)
  Alert.alert('Error', e.message)
}

const sendStickerPack = () => {
  RNWhatsAppStickers.createStickerPackFromURL(packConfig)
    .then(() => {
      const promises = stickers.map(item =>
        RNWhatsAppStickers.addStickerFromURL(item.fileName, item.emojis)
      )
      Promise.all(promises).then(() => RNWhatsAppStickers.send())
    })
    .catch(logError)
}

const TextBold = ({ children }) => (
  <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{children}</Text>
)

export const App = () => {
  const [isAvailable, setIsAvailable] = useState(false)

  useEffect(() => {
    RNWhatsAppStickers.isWhatsAppAvailable()
      .then(setIsAvailable)
      .catch(logError)
  }, [])

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 28, fontWeight: 'bold', marginBottom: 48 }}>
        RNWhatsAppStickers
      </Text>
      <Text style={{ marginBottom: 24, fontSize: 16 }}>
        WhatsApp is{' '}
        {isAvailable ? (
          <TextBold>available</TextBold>
        ) : (
          <TextBold>not available</TextBold>
        )}
      </Text>
      {isAvailable && (
        <Button title="Send Stickers" onPress={sendStickerPack} />
      )}
    </View>
  )
}
