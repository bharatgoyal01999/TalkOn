import * as React from 'react'
import {View ,Button,Text} from 'react-native'
import ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';

export default class MyComponent extends React.Component{

state={
  videoSource:''
}



selectVideo = () => {

  const options2 = {
    title: 'Select video',
     mediaType: 'video',
    path:'video',
    quality: 1
  };

ImagePicker.showImagePicker(options2, (response) => {
console.log('Response = ', response);

if (response.didCancel) {
  console.log('User cancelled image picker');
} else if (response.error) {
  console.log('ImagePicker Error: ', response.error);
} else if (response.customButton) {
  console.log('User tapped custom button: ', response.customButton);
} else {
  const source = { uri: response.uri };


  this.setState({videoSource: source})


}
});


}

render(){
return(

<View>

    <Video source={this.state.videoSource}   // Can be a URL or a local file.
           ref={(ref) => {
             this.player = ref
           }}                                      // Store reference
           onBuffer={this.onBuffer}                // Callback when remote video is buffering
           onError={this.videoError}               // Callback when video cannot be loaded
           style={{height:400}}
           controls={true}
           fullscreen={true}
            />


    <Button small primary onPress={this.selectVideo} title='select-video'>
      
    </Button>



</View>

);
}

}
