package mindsgn.studio.orbyt;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;


public class WalletModule extends ReactContextBaseJavaModule {
    WalletModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "Wallet";
    }

    @ReactMethod
    public void getMetadata(String file, Callback cb) {
        try {
            cb.invoke(null, "Wallet");
        } catch (Exception err) {
            cb.invoke(err, null);
        }
    }
}


